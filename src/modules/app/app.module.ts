import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import {
  AllExceptionFilter,
  NormalExceptionFilter,
  ValidationExceptionFilter,
} from '@/filter';
import { AppConfig } from './app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { Module, ValidationError, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from '@/interceptor/response.interceptor';

@Module({
  imports: [
    // Allow to access .env file and validate env variables
    ConfigModule.forRoot(AppConfig.getInitConifg()),
    // Logger framework that better then NestJS default logger
    LoggerModule.forRoot(AppConfig.getLoggerConfig()),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    { provide: APP_FILTER, useClass: NormalExceptionFilter },
    { provide: APP_FILTER, useClass: ValidationExceptionFilter },
    {
      // Allowing to do validation through DTO
      // Since class-validator library default throw BadRequestException, here we use exceptionFactory to throw
      // their internal exception so that filter can recognize it
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          exceptionFactory: (errors: ValidationError[]) => {
            return errors[0];
          },
        }),
    },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
  ],
})
export class AppModule {}
