import * as path from 'path';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { ConfigModule } from '@nestjs/config';
import { HeaderResolver, I18nJsonParser, I18nModule } from 'nestjs-i18n';
import { Module } from '@nestjs/common';
import { NodeEnv } from './types/enums';
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
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: process.env.DEBUG === 'true',
      debug: process.env.DEBUG === 'true',
      synchronize: process.env.NODE_ENV === NodeEnv.LOCAL,
      entities: [`${__dirname}/database/entities/*.entity.js`],
      migrations: [`${__dirname}/database/migrations/*.migration.js`],
      subscribers: [`${__dirname}/database/subscribers/*.subscriber.js`],
      extra: {
        // For SQL Server that has self signed certificate error, uncomment below setting
        // trustServerCertificate: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
