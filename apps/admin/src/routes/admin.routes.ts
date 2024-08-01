/**
 * @fileoverview Defines routes for managing admin-related HTTP requests.
 * @module AdminRoutes
 * @version 1.0.0
 */

import { Router } from 'express';
import AdminController from '../controllers/admin.controller';
import { UserController } from '@job-finder/controllers';

/**
 * Class for setting up admin-related routes.
 * @class AdminRoutes
 */
export default class AdminRoutes {
  private readonly adminRouter: Router;

  /**
   * Creates an instance of AdminRoutes.
   * @param {AdminController} adminController - The controller to handle admin operations.
   */
  constructor(
    private readonly adminController: AdminController = new AdminController(),
    private readonly userController: UserController = new UserController(
      'admin'
    )
  ) {
    this.adminRouter = Router();
    this.adminController = adminController;
  }

  /**
   * Sets up the routes for candidate management.
   * @private
   */
  private setupRoutes(): void {
    this.adminRouter.get('/', this.adminController.getProfile);
    this.adminRouter.patch('/', this.adminController.updateProfile);
    this.adminRouter.patch(
      '/contact',
      this.userController.updateContactDetails
    );
    this.adminRouter.patch('/password', this.userController.updatePassword);
    this.adminRouter.delete('/', this.userController.removeAccount);
  }

  /**
   * Initializes the routes and returns the router instance.
   * @returns {Router} The configured router instance.
   */
  public init = (): Router => {
    this.setupRoutes();
    return this.adminRouter;
  };
}
