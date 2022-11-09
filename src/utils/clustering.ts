import * as _cluster from 'cluster';
import * as os from 'os';
import { AppConfig } from '@mod/app';
import { PinoLogger } from 'nestjs-pino';

const cluster = _cluster as unknown as _cluster.Cluster;
const numCPUs = os.cpus().length;

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
