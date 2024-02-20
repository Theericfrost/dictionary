import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UserPayloadDto } from './dto/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { EncryptionService } from 'src/encryption/encryption.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ username, secret, password }: UserPayloadDto) {
    if (secret !== process.env.SECRET_API_KEY) {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }

    const user = await this.prismaService.user.findUnique({
      where: { username },
    });

    if (!user) {
      const userData = {
        username,
        password: await this.encryptionService.encrypt(password),
      };

      const result = await this.prismaService.user.create({
        data: userData,
      });

      delete result.password;

      return result;
    } else {
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    }
  }

  async validateUser({ username }: { username: string }) {
    const user = await this.prismaService.user.findUnique({
      where: { username },
    });
    if (!user) return null;

    delete user.password;

    return this.jwtService.sign(user);
  }
}
