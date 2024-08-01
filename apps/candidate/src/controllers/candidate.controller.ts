/**
 * @fileoverview
 * @module
 * @version
 */
import { HttpStatusCode } from 'axios';
import { Request, Response } from 'express';
import { ResponseUtil } from '@job-finder/utils';
import CandidateService from '../services/candidate.services';
import { ICandidate } from '@job-finder/interfaces';
import { validateCandidate } from '../validators/candidate.validator';

export default class CandidateController extends ResponseUtil {
  private readonly candidateService: CandidateService;

  constructor() {
    super('admin');
    this.candidateService = new CandidateService('candidate.controller');
  }

  public getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id }: { id: number } = req.app.locals.user;

      const payload = await this.candidateService.getProfile(id);

      return this.response(res, HttpStatusCode.Ok, payload);
    } catch (error) {
      this.handleError(res, error);
    }
  };

  public updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id }: { id: number } = req.app.locals.user;
      const updateData = req.body as Partial<ICandidate>;

      const { error } = validateCandidate(updateData);
      if (error) {
        return this.unprocessableEntity(res, error.details[0].message);
      }

      await this.candidateService.updateProfile(id, updateData);

      return this.response(res, HttpStatusCode.Ok, undefined);
    } catch (error) {
      this.handleError(res, error);
    }
  };
}
