import * as Joi from 'joi';
import { ConfigModuleOptions } from '@nestjs/config';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { FastifyError } from 'fastify';
import { IncomingMessage, ServerResponse } from 'http';
import { LogLevel, NodeEnv } from '@share/enums';
import { NormalException } from '@/exception/normal.exception';
import { Params } from 'nestjs-pino';

export class AppConfig {
  public static getFastifyInstance(): FastifyAdapter {
    const fastifyAdapter = new FastifyAdapter({ logger: false });

    // Since NestJS filter cannot catch JSON parse error in request body [Fastify layer catch this error]
    // but Fastify's error response format do not match our format here
    // so we have to do extra step here to sync error response format
    fastifyAdapter.setErrorHandler(
      (error: FastifyError, request: any, reply: any) => {
        reply.send(
          error instanceof SyntaxError
            ? NormalException.REQUEST_BODY_CANNOT_PARSE().toJSON()
            : NormalException.FRAMEWORK_ISSUE().toJSON()
        );
      }
    );
    return fastifyAdapter;
  }

  public static getInitConifg(): ConfigModuleOptions {
    const validNodeEnvList = Object.keys(NodeEnv).map((key) => NodeEnv[key]);
    const validLogLevelList = Object.keys(LogLevel).map((key) => LogLevel[key]);

    return {
      isGlobal: true,
      validationSchema: Joi.object(<
        { [P in keyof NodeJS.ProcessEnv]: Joi.SchemaInternals }
      >{
        PORT: Joi.number().min(1).max(65535).required(),
        NODE_ENV: Joi.string()
          .valid(...validNodeEnvList)
          .required(),
        LOG_LEVEL: Joi.string()
          .allow('')
          .valid(...validLogLevelList)
          .optional(),
        BASE_PATH: Joi.string().allow('').optional(),
        CLUSTERING: Joi.boolean().required(),
      }),
    };
  }

  public static getLoggerConfig(): Params {
    const { NODE_ENV, LOG_LEVEL, CLUSTERING } = process.env;

    return {
      pinoHttp: {
        transport:
          NODE_ENV !== NodeEnv.PRODUCTION
            ? {
                target: 'pino-pretty',
                options: {
                  translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
                },
              }
            : null,
        autoLogging: true,
        level:
          LOG_LEVEL ||
          (NODE_ENV === NodeEnv.PRODUCTION ? LogLevel.INFO : LogLevel.TRACE),
        serializers: {
          req(request: IncomingMessage) {
            return {
              method: request.method,
              url: request.url,
              // Including the headers in the log could be in violation of privacy laws, e.g. GDPR.
              // headers: request.headers,
            };
          },
          res(reply: ServerResponse) {
            return {
              statusCode: reply.statusCode,
            };
          },
        },
        customAttributeKeys: {
          responseTime: 'timeSpent',
        },
        base: CLUSTERING === 'true' ? { pid: process.pid } : {},
      },
    };
  }
}
