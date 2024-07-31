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
   * @param {AdminController} adminController - The controller to handle admin operations.
   */
  constructor(adminController: AdminController = new AdminController()) {
    this.adminRouter = Router();
    this.adminController = adminController;
  }

  /**
   * Initializes the admin routes and attaches them to the router.
   * @returns {Router} The configured router with admin routes.
   */
  public init = (): Router => {
    /**
     * GET /admin/
     * Route for retrieving the profile of the currently authenticated admin.
     */
    this.adminRouter.get('/', this.adminController.getProfile);

    /**
     * POST /admin/
     * Route for updating the profile of the currently authenticated admin.
     */
    this.adminRouter.post('/', this.adminController.updateProfile);

    /**
     * POST /admin/contact
     * Route for updating the contact information of the currently authenticated admin.
     */
    this.adminRouter.post('/contact', this.adminController.updateContact);

    /**
     * POST /admin/password
     * Route for updating the password of the currently authenticated admin.
     */
    this.adminRouter.post('/password', this.adminController.updatePassword);

    /**
     * DELETE /admin/
     * Route for removing the account of the currently authenticated admin.
     */
    this.adminRouter.delete('/', this.adminController.removeAccount);

    return this.adminRouter;
  };
}
