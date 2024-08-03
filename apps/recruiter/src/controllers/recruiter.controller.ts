/**
 * @fileoverview
 * @module
 * @version
 */
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { ResponseUtil } from '@job-finder/utils';
import RecruiterService from '../services/recruiter.service';
import { IRecruiter } from '@job-finder/interfaces';
import { validateRecruiter } from '../validators/recruiter.validator';

export default class RecruiterController extends ResponseUtil {
  private readonly recruiterService: RecruiterService;

  constructor() {
    super('recruiter');
    this.recruiterService = new RecruiterService('recruiter.controller');
  }

  public getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id }: { id: number } = req.app.locals.user;

      const payload = await this.recruiterService.getProfile(id);

      return this.response(res, HttpStatusCode.Ok, payload);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id }: { id: number } = req.app.locals.user;
      const updateData = req.body as Partial<IRecruiter>;

      const { error } = validateRecruiter(updateData);
      if (error) {
        return this.unprocessableEntity(res, error.details[0].message);
      }

      await this.recruiterService.updateProfile(id, updateData);

      return this.response(res, HttpStatusCode.NoContent, undefined);
    } catch (error) {
      this.handleError(res, error);
    }
  };
}
