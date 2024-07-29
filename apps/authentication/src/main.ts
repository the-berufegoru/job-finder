/**
 * @fileoverview Express application setup and configuration with request logging.
 * @version 1.0.0
 * @module appConfig
 */
import express, { Application } from 'express';
import { configureMiddlewares } from '@job-finder/middlewares';
import { startServer } from '@job-finder/utils';
import AuthRoutes from './routes/authRoutes';

const PORT: string = process.env.PORT ?? '3001';

/**
 * The Express application instance.
 * @type {Application}
 */
const app: Application = express();

configureMiddlewares(app);

app.use('/api/v1/auth', new AuthRoutes().init());

startServer(app, 'Authentication', parseInt(PORT, 10));
