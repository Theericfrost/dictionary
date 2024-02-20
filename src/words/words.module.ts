import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { WordsController } from './words.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';

@Module({
  imports: [PrismaModule],
  providers: [WordsService, JwtStrategy],
  controllers: [WordsController],
})
export class WordsModule {}
