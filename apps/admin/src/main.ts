/**
 * @fileoverview Express application setup and configuration with request logging.
 * @version 1.0.0
 * @module appConfig
 */
import express, { Application } from 'express';
import { configureMiddlewares } from '@job-finder/middlewares';
import { startServer } from '@job-finder/utils';
import AdminRoutes from './routes/admin.routes';
import { authorizationMiddleware } from './middlewares';

import dotenv from 'dotenv';
dotenv.config();

const PORT: string = process.env.PORT ?? '3002';

/**
 * The Express application instance.
 * @type {Application}
 */
const app: Application = express();

configureMiddlewares(app);

app.use(
  '/api/v1/admin',
  authorizationMiddleware.authorizeAdmin,
  new AdminRoutes().init()
);

startServer(app, 'Admin', parseInt(PORT, 10));
