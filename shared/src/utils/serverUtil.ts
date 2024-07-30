import dotenv from 'dotenv';
import http from 'http';
import ip from 'ip';
import os from 'os';
import { systemLogger } from './index';
import { sequelize, associateModels } from '../db/models';
import { Application } from 'express';

dotenv.config();

/**
 * Initialize and start the server.
 * @param {Application} app - The Express application instance.
 */
export const startServer = async (
  app: Application,
  serviceName: string,
  port = 3000
): Promise<void> => {
  try {
    // Associate all models
    associateModels();

    // Authenticate and sync database
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    // Start the server
    const server: http.Server = http.createServer(app);

    server.listen(port, () => {
      systemLogger.info({
        serviceName,
        host: `http://${ip.address()}:${port}`,
        platform: os.platform(),
      });
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      const bind = typeof port === 'string' ? `Pipe ${port}` : `port ${port}`;
      switch (error.code) {
        case 'EACCES':
          systemLogger.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          systemLogger.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
  } catch (error: any) {
    systemLogger.error('Failed to establish connection to database.', {
      error_name: error.constructor.name,
      error_message: `${error}`,
      error_stack: error.stack,
    });
    process.exit(1);
  }
};
