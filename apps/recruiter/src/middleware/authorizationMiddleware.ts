/**
 * @fileoverview Middleware for handling authorization logic.
 * @module AuthorizationMiddleware
 * @version 1.0.0
 */
import { NextFunction, Request, Response } from 'express';
import { JwtUtil, ResponseUtil } from '@job-finder/utils';
import { AuthenticationMiddleware } from '@job-finder/middlewares';

export default class AuthorizationMiddleware extends ResponseUtil {
  private readonly jwtUtil: JwtUtil;
  private readonly authenticationMiddleware: AuthenticationMiddleware;

  /**
   * Private static error messages
   * @private
   * @static
   */
  private static readonly ERROR_MESSAGES = {
    AUTH_ERROR: 'Error during authorization:',
    INVALID_TOKEN: 'Invalid or expired authorization token.',
    ACCESS_DENIED: 'Access denied.',
    SESSION_EXPIRED: 'Session has expired. Please log in again.',
  };

  /**
   * Holds the single instance of the class
   * @private
   * @static
   */
  private static instance: AuthorizationMiddleware;

  /**
   * Private constructor to prevent direct instantiation
   * @private
   */
  private constructor() {
    super('recruiter');
    this.moduleName = 'recruiter.authorization.middleware';
    this.jwtUtil = new JwtUtil();
    this.authenticationMiddleware = new AuthenticationMiddleware();
  }

  /**
   * Gets the singleton instance of AuthorizationMiddleware
   * @static
   * @returns {AuthorizationMiddleware} The singleton instance
   */
  public static getInstance(): AuthorizationMiddleware {
    if (!AuthorizationMiddleware.instance) {
      AuthorizationMiddleware.instance = new AuthorizationMiddleware();
    }
    return AuthorizationMiddleware.instance;
  }

  /**
   * Middleware to authorize recruiter users.
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   * @param {NextFunction} next - Express next middleware function
   * @returns {Promise<void>}
   */
  public authorizeRecruiter = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      this.authenticationMiddleware.isAuthenticated(req, res, () => {
        const { role, token } = req.app.locals.authorizationConfig;

        const jwtPayload = {
          role,
          tokenType: 'accessToken',
          jwtToken: token,
        };

        this.jwtUtil.verifyJwtToken(jwtPayload, (error, decoded) => {
          if (error) {
            console.error(error);
            const errorMessage =
              error.name === 'TokenExpiredError'
                ? AuthorizationMiddleware.ERROR_MESSAGES.SESSION_EXPIRED
                : AuthorizationMiddleware.ERROR_MESSAGES.INVALID_TOKEN;
            return this.error(res, 403, errorMessage);
          }

          req.app.locals.user = decoded;
          next();
        });
      });
    } catch (error) {
      console.error(AuthorizationMiddleware.ERROR_MESSAGES.AUTH_ERROR, error);
      this.error(
        res,
        403,
        AuthorizationMiddleware.ERROR_MESSAGES.ACCESS_DENIED
      );
    }
  };
}

export const authorizationMiddleware = AuthorizationMiddleware.getInstance();
