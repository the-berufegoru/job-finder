/**
 * @fileoverview Express application setup and configuration with request logging.
 * @version 1.0.0
 * @module appConfig
 */
import express, { Application } from 'express';
import { configureMiddlewares } from '@job-finder/middlewares';
import { startServer } from '@job-finder/utils';

/**
 * The Express application instance.
 * @type {Application}
 */
const app: Application = express();

configureMiddlewares(app);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const API_VERSION = 'api/v1';

startServer(app, 'Job-Finder');
