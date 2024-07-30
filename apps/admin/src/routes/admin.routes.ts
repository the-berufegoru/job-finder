/**
 * @fileoverview
 * @module
 * @version
 */
import { Router } from 'express';
import AdminController from '../controllers/admin.controller';

export default class AdminRoutes {
  private readonly adminRouter: Router;
  private readonly adminController: AdminController;

  constructor() {
    this.adminRouter = Router();
    this.adminController = new AdminController();
  }

  public init = (): Router => {
    this.adminRouter.get('/', this.adminController.getProfile);

    this.adminRouter.delete('/', this.adminController.removeAccount);

    return this.adminRouter;
  };
}
