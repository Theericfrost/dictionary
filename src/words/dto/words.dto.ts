import { IsString } from 'class-validator';

export class WordsPayloadDto {
  @IsString()
  label: string;

  @IsString()
  translation: string;
}

export class UserGuardPayload {
  id: string;
}

export class RequestWithUser extends Request {
  user: UserGuardPayload;
}
