/**
 * @fileoverview Middleware configuration for the Express application.
 * @version 1.0.0
 * @module appMiddleware
 */

import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
// import * as swaggerUi from 'swagger-ui-express';
// import AuthRoutes from '../routes/authRoutes';

/**
 * Configure middlewares for the Express application.
 * @param {Application} app - The Express application instance.
 */
export const configureMiddlewares = (app: Application): void => {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  });
  app.use(limiter);
  app.set('trust proxy', 1);
  app.use(helmet());
  app.use(
    cors({
      origin: ['*'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      credentials: true,
    })
  );
  app.use(compression());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  //   app.use(
  //     '/docs',
  //     swaggerUi.serve,
  //     swaggerUi.setup(undefined, {
  //       swaggerOptions: {
  //         url: '/swagger.json',
  //       },
  //     })
  //   );
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
};
