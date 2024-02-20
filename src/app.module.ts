import { Module } from '@nestjs/common';
import { WordsModule } from './words/words.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { EncryptionModule } from './encryption/encryption.module';

@Module({
  imports: [
    WordsModule,
    PrismaModule,
    UserModule,
    ConfigModule.forRoot(),
    EncryptionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
