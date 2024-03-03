import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WordsService {
  constructor(private prisma: PrismaService) {}

  async findAll({ id }) {
    const result = await this.prisma.word.findMany({
      where: {
        userId: id,
      },
    });

    return result;
  }

  async create({ id }, data) {
    const label = data?.label?.toLowerCase();
    const word = await this.prisma.word.findFirst({
      where: { userId: id, label },
    });

    if (!word) {
      const result = await this.prisma.word.create({
        data: { ...data, label, userId: id },
      });

      return result;
    } else {
      throw new HttpException('Already exists', HttpStatus.FORBIDDEN);
    }
  }

  async change({ id }, data, wordId) {
    const label = data?.label?.toLowerCase();
    const result = await this.prisma.word.update({
      where: { id: wordId, userId: id },
      data: { translation: data.translation, label, userId: id },
    });

    return result;
  }

  async delete({ id }, wordId) {
    const result = await this.prisma.word.delete({
      where: { id: wordId, userId: id },
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

  async getWordsByLetter({ id }, letter) {
    const result = await this.prisma.word.findMany({
      where: {
        userId: id,
        label: { startsWith: letter },
      },
    });

    return result;
  }
}
