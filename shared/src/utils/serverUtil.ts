/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @fileoverview Server setup and configuration.
 * @version 1.0.0
 * @since 2023-10-27
 * @module server
 */
import dotenv from 'dotenv';
import http from 'http';
import ip from 'ip';
import os from 'os';
import { logger } from './index';
import { sequelize } from '../libs';
import { Application } from 'express';

dotenv.config();

const PORT: string | number = process.env.PORT ?? 8080;

/**
 * Initialize and start the server.
 * @param {Application} app - The Express application instance.
 */
export const startServer = async (
  app: Application,
  appName: string,
  port = 8080
): Promise<void> => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });

    const server: http.Server = http.createServer(app);

    server.listen(port, () => {
      logger.info({
        app_name: appName,
        host: `http://${ip.address()}:${port}`,
        platform: os.platform(),
      });
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.syscall !== 'listen') {
        throw error;
      }
      const bind = typeof port === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;
      switch (error.code) {
        case 'EACCES':
          logger.error(`${bind} requires elevated privileges`);
          process.exit(1);
          break;
        case 'EADDRINUSE':
          logger.error(`${bind} is already in use`);
          process.exit(1);
          break;
        default:
          throw error;
      }
    });
  } catch (error: any) {
    logger.error('Failed to establish connection to database.', {
      error_name: error.constructor.name,
      error_message: `${error}`,
      error_stack: error.stack,
    });
    process.exit(1);
  }
};
