import { IsEmail, IsString } from 'class-validator';

export class UserPayloadDto {
  @IsEmail()
  username: string;

  @IsString()
  password: string;

  @IsString()
  secret: string;
}

class UserDto {
  _id?: string;
  username: string;
  password?: string;
}

export class RequestWithUser extends Request {
  user: UserDto;
}
