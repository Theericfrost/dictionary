import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WordsService } from './words.service';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { RequestWithUser, WordsPayloadDto } from './dto/words.dto';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Req() req: RequestWithUser) {
    return this.wordsService.findAll(req?.user);
  }

  @Get('letters')
  @UseGuards(JwtAuthGuard)
  async getLetters(@Req() req: RequestWithUser) {
    return this.wordsService.getLetters(req?.user);
  }

  @Get(':letter')
  @UseGuards(JwtAuthGuard)
  getWordsByLetter(
    @Req() req: RequestWithUser,
    @Param('letter') letter: string,
  ) {
    return this.wordsService.getWordsByLetter(req?.user, letter);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Req() req: RequestWithUser,
    @Body() wordsPayloadDto: WordsPayloadDto,
  ) {
    return this.wordsService.create(req?.user, wordsPayloadDto);
  }
}
