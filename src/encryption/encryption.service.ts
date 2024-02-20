import { Injectable } from '@nestjs/common';
import { createCipheriv, randomBytes, createDecipheriv } from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly algorithm = 'aes-256-cbc';
  private readonly key = process.env.SECRET_KEY;

  async encrypt(password) {
    const iv = randomBytes(16); // Создаем случайный инициализационный вектор
    const cipher = createCipheriv(this.algorithm, Buffer.from(this.key), iv);

    let encryptedPassword = cipher.update(password, 'utf8', 'hex');
    encryptedPassword += cipher.final('hex');

    return iv.toString('hex') + ':' + encryptedPassword;
  }

  async decrypt(encryptedPassword) {
    const [ivString, encryptedPasswordString] = encryptedPassword.split(':');
    const iv = Buffer.from(ivString, 'hex');
    const encryptedPasswordBuffer = Buffer.from(encryptedPasswordString, 'hex');

    const decipher = createDecipheriv(
      this.algorithm,
      Buffer.from(this.key),
      iv,
    );

    let decryptedPassword = decipher.update(encryptedPasswordBuffer);
    decryptedPassword = Buffer.concat([decryptedPassword, decipher.final()]);

    return decryptedPassword.toString();
  }
}
