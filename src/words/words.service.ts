import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WordsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ username }) {
    const result = await this.prisma.word.findMany({
      where: {
        userName: username,
      },
    });

    return result;
  }

  async getLetters(user) {
    const result = await this.findAll(user);

    const letters = new Set();

    result.forEach((word) => {
      letters.add(word.label[0]);
    });

    return Array.from(letters);
  }

  async getWordsByLetter({ username }, letter) {
    const result = await this.prisma.word.findMany({
      where: {
        userName: username,
        label: { startsWith: letter },
      },
    });

    return result;
  }

  async create({ username }, data) {
    const word = await this.prisma.word.findFirst({
      where: { userName: username, label: data?.label },
    });
    if (!word) {
      const result = await this.prisma.word.create({
        data: { ...data, label: data?.label.toLowerCase(), userName: username },
      });

      return result;
    } else {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
  }
}
