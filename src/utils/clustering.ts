import { AppConfig } from '@mod/app';
import { PinoLogger } from 'nestjs-pino';
import cluster from 'node:cluster';
import { cpus } from 'node:os';
import process from 'node:process';

const numCPUs = cpus().length;

/**
 * Determine your total CPU to create certain threads to improve the performance
 */
export const clusterize = (callback: () => Promise<void>) => {
  const logger = new PinoLogger(AppConfig.getLoggerConfig());
  if (cluster.isPrimary) {
    logger.info(`Master server started`);
    for (let i = 0; i < numCPUs; i += 1) {
      cluster.fork();
    }
    cluster.on('exit', (worker) => {
      logger.info(`Worker ${worker.process.pid} died. Restarting`);
      cluster.fork();
    });
  } else {
    logger.info(`Cluster server started on ${process.pid}`);
    callback();
  }
};
