/**
 * @fileoverview Express application setup and configuration with request logging.
 * @version 1.0.0
 * @module appConfig
 */
import express, { Application } from 'express';
import { configureMiddlewares } from '@job-finder/middlewares';
import { startServer } from '@job-finder/utils';

import dotenv from 'dotenv';
dotenv.config();

const PORT: string = process.env.PORT ?? '3003';

/**
 * The Express application instance.
 * @type {Application}
 */
const app: Application = express();

configureMiddlewares(app);

startServer(app, 'Candidate', parseInt(PORT, 10));
