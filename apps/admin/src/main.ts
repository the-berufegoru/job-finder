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
import rateLimit from 'express-rate-limit';
dotenv.config();

const PORT: string = process.env.PORT ?? '3002';

/**
 * The Express application instance.
 * @type {Application}
 */
const app: Application = express();

configureMiddlewares(app);

const adminRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute window
  max: 1000, // Limit each IP to 1000 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(
  '/api/v1/admin',
  adminRateLimiter,
  authorizationMiddleware.authorizeAdmin,
  new AdminRoutes().init()
);

startServer(app, 'Admin', parseInt(PORT, 10));
