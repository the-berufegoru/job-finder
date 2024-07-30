/**
 * @fileoverview Defines routes for managing admin-related HTTP requests.
 * @module AdminRoutes
 * @version 1.0.0
 */

import { Router } from 'express';
import AdminController from '../controllers/admin.controller';

/**
 * Class for setting up admin-related routes.
 * @class AdminRoutes
 */
export default class AdminRoutes {
  private readonly adminRouter: Router;
  private readonly adminController: AdminController;

  /**
   * Creates an instance of AdminRoutes.
   */
  constructor() {
    this.adminRouter = Router();
    this.adminController = new AdminController();
  }

  /**
   * Initializes the admin routes and attaches them to the router.
   * @returns {Router} The configured router with admin routes.
   */
  public init = (): Router => {
    this.adminRouter.get('/', this.adminController.getProfile);

    this.adminRouter.patch('/', this.adminController.updateProfile);

    this.adminRouter.delete('/', this.adminController.removeAccount);

    return this.adminRouter;
  };
}
