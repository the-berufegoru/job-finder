/**
 * @fileoverview Controller for handling admin-related HTTP requests.
 * @version 1.0.0
 * @module AdminController
 */

import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import AdminService from '../services/admin.service';
import { ResponseUtil } from '@job-finder/utils';
import { IAdmin } from '@job-finder/interfaces';
import { validateAdmin } from '../validators/admin.validator';

/**
 * Controller class for managing admin profiles.
 * @class AdminController
 * @extends ResponseUtil
 */
export default class AdminController extends ResponseUtil {
  private readonly adminService: AdminService;

  /**
   * Creates an instance of AdminController.
   */
  constructor() {
    super('admin');
    this.moduleName = 'admin.controller';
    this.adminService = new AdminService();
  }

  /**
   * Retrieves the profile of the currently authenticated admin.
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>}
   * @throws {InternalServerError} If an unexpected error occurs.
   */
  public getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id }: { id: number } = req.app.locals.user;
      const payload = await this.adminService.getAdmin(id);

      return this.response(res, HttpStatusCode.Ok, payload);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  /**
   * Updates the profile of the currently authenticated admin.
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>}
   * @throws {UnprocessableEntityError} If validation fails.
   * @throws {InternalServerError} If an unexpected error occurs.
   */
  public updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id }: { id: number } = req.app.locals.user;
      const updateData = req.body as Partial<IAdmin>;

      const { error } = validateAdmin(updateData);

      if (error) {
        const errorMessage = error.details[0].message;
        return this.unprocessableEntity(res, errorMessage);
      }

      await this.adminService.updateAdmin(id, updateData);

      return this.response(res, HttpStatusCode.NoContent, undefined);
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  /**
   * Removes the account of the currently authenticated admin.
   * @param {Request} req - The HTTP request object.
   * @param {Response} res - The HTTP response object.
   * @returns {Promise<void>}
   * @throws {InternalServerError} If an unexpected error occurs.
   */
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
