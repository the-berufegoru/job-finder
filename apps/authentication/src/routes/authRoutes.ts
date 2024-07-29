/**
 * @fileoverview Routes for handling auth-related operations.
 * @version 1.0.0
 * @since 2023-10-27
 * @module authRoutes
 */

import { Router } from 'express';
import AuthController from '../controllers/authController';
import { AuthorizationMiddleware, rateLimiter } from '../middlewares';

export default class AuthRoutes {
  private readonly authRouter: Router;
  private readonly authController: AuthController;
  private readonly authMiddleware: AuthorizationMiddleware;

  constructor() {
    this.authRouter = Router();
    this.authController = new AuthController();
    this.authMiddleware = new AuthorizationMiddleware();
  }

  /**
   * Initializes auth routes.
   * @returns {Router} The configured router.
   */
  public init = (): Router => {
    /**
     * Route for logging in a user.
     * @name /login
     * @function
     * @memberof module:authRoutes
     * @inner
     */
    this.authRouter.post(
      '/login',
      rateLimiter.loginAndLogout(),
      this.authController.login
    );

    /**
     * Route for registering a new user.
     * @name /register
     * @function
     * @memberof module:authRoutes
     * @inner
     */
    this.authRouter.post(
      '/register',
      rateLimiter.register(),
      this.authController.register
    );

    /**
     * Route for logging out a user.
     * @name /logout
     * @function
     * @memberof module:authRoutes
     * @inner
     */
    this.authRouter.get(
      '/logout',
      rateLimiter.loginAndLogout(),
      this.authMiddleware.isAuthorized,
      this.authController.logout
    );

    /**
     * Route for initiating the forgot password process.
     * @name /password/forgot
     * @function
     * @memberof module:authRoutes
     * @inner
     */
    this.authRouter.get(
      '/password/forgot',
      rateLimiter.passwordResetAndActivation(),
      this.authController.forgotPassword
    );

    /**
     * Route for resetting a user's password.
     * @name /password/reset
     * @function
     * @memberof module:authRoutes
     * @inner
     */
    this.authRouter.patch(
      '/password/reset',
      rateLimiter.passwordResetAndActivation(),
      this.authMiddleware.authorizePasswordReset,
      this.authController.resetPassword
    );

    /**
     * Route for requesting account activation.
     * @name /account/request_activation
     * @function
     * @memberof module:authRoutes
     * @inner
     */
    this.authRouter.get(
      '/account/request_activation',
      rateLimiter.passwordResetAndActivation(),
      this.authController.requestAccountActivation
    );

    /**
     * Route for confirming account activation.
     * @name /account/confirm_activation
     * @function
     * @memberof module:authRoutes
     * @inner
     */
    this.authRouter.get(
      '/account/confirm_activation',
      rateLimiter.passwordResetAndActivation(),
      this.authMiddleware.authorizeAccountActivation,
      this.authController.confirmAccountActivation
    );

    return this.authRouter;
  };
}
