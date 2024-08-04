/**
 * @fileoverview Express application setup and configuration with request logging.
 * @version 1.0.0
 * @module appConfig
 */
import express, { Application } from 'express';
import { configureMiddlewares } from '@job-finder/middlewares';
import { startServer } from '@job-finder/utils';

import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { authorizationMiddleware } from './middleware';
import RecruiterRoutes from './routes/recruiter.routes';
dotenv.config();

const PORT: string = process.env.PORT ?? '3003';

/**
 * The Express application instance.
 * @type {Application}
 */
const app: Application = express();

configureMiddlewares(app);

const recruiterLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(
  '/api/v1/recruiter',
  recruiterLimiter,
  authorizationMiddleware.authorizeRecruiter,
  new RecruiterRoutes().init()
);

startServer(app, 'Recruiter', parseInt(PORT, 10));
