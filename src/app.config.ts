import { NodeEnv } from '@/utils/enums';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export class AppConfig {
  public static getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: process.env.DEBUG === 'true',
      debug: process.env.DEBUG === 'true',
      synchronize: process.env.NODE_ENV === NodeEnv.LOCAL,
      entities: [`${__dirname}/database/entities/*.entity{.ts,.js}`],
      migrations: [`${__dirname}/database/migrations/*.migration{.ts,.js}`],
      subscribers: [`${__dirname}/database/subscribers/*.subscriber{.ts,.js}`],
      cli: {
        migrationsDir: `${__dirname}/database/migrations`,
        entitiesDir: `${__dirname}/database/entities`,
        subscribersDir: `${__dirname}/database/subscribers`,
      },
      extra: {
        // For SQL Server that has self signed certificate error, uncomment below setting
        // trustServerCertificate: true,
      },
    };
  }
}
