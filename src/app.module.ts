import * as path from 'path';
import { AppConfig } from '@/app.config';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConfigModule } from '@nestjs/config';
import { HeaderResolver, I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // Allow to access .env file
    ConfigModule.forRoot(),
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      parser: I18nJsonParser,
      parserOptions: {
        path: path.join(__dirname, '/i18n/'),
      },
      resolvers: [{ use: HeaderResolver, options: ['lang', 'locale'] }],
    }),
    // Protect application from brute-force attacks
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 5,
    }),
    TypeOrmModule.forRoot(AppConfig.getTypeOrmConfig()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
