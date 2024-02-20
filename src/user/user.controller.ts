import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RequestWithUser, UserPayloadDto } from './dto/user.dto';
import { LocalGuard } from './guards/local.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userPayload: UserPayloadDto) {
    return await this.userService.register(userPayload);
  }

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Req() req: RequestWithUser) {
    return req.user;
  }
}
