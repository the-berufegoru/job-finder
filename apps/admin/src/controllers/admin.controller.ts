/**
 * @fileoverview
 * @version
 * @module
 */
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import AdminService from '../services/admin.service';
import { ResponseUtil } from '@job-finder/utils';

export default class AdminController extends ResponseUtil {
  private readonly adminService: AdminService;

  constructor() {
    super();
    this.moduleName = 'admin.service';
    this.adminService = new AdminService();
  }

  public getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id }: { id: number } = req.app.locals.user;
      const payload = await this.adminService.getAdmin(id);

      return this.response(res, HttpStatusCode.Ok, payload);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public removeAccount = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id }: { id: number } = req.app.locals.user;

      await this.adminService.removeAdmin(id);

      return this.response(res, HttpStatusCode.NoContent, undefined);
    } catch (error) {
      this.handleError(res, error);
    }
  };
}
