/**
 * @fileoverview This service handles candidate-related operations such as retrieving profiles, updating details, and removing profiles.
 * @module CandidateService
 * @version 1.0.0
 */
import { RecruiterHelper, UserHelper } from '@job-finder/db/helpers';
import { IRecruiter } from '@job-finder/interfaces';
import { CreateErrorUtil } from '@job-finder/utils';
import { RecruiterDto, toRecruiterDto } from '../dtos/recruiter.dto';

export default class RecruiterService {
  private readonly moduleName: string;
  private readonly recruiterHelper: RecruiterHelper;
  private readonly userHelper: UserHelper;
  private readonly errorUtil: CreateErrorUtil;

  constructor(moduleName: string) {
    this.moduleName = moduleName;
    this.recruiterHelper = new RecruiterHelper();
    this.userHelper = new UserHelper();
    this.errorUtil = new CreateErrorUtil();
  }

  public getProfile = async (userId: number): Promise<RecruiterDto> => {
    try {
      const foundRecruiter = await this.recruiterHelper.getRecruiter({
        userId,
      });
      if (!foundRecruiter) {
        throw this.errorUtil.createNotFoundError(
          'An unexpected error occurred while loading the recruiter profile.',
          {
            module: this.moduleName,
            method: 'getProfile',
            trace: {
              error: 'User document not found.',
              log: userId,
            },
          }
        );
      }

      return toRecruiterDto(foundRecruiter);
    } catch (error) {
      throw this.errorUtil.createInternalServerError(
        'An unexpected error occurred while loading the recruiter profile.',
        {
          module: this.moduleName,
          method: 'getProfile',
          trace: { error: error.message, log: userId },
        }
      );
    }
  };

  public updateProfile = async (
    userId: number,
    updateProfileQuery: Partial<IRecruiter>
  ): Promise<void> => {
    try {
      const foundRecruiter = await this.recruiterHelper.getRecruiter({
        userId,
      });
      if (!foundRecruiter) {
        throw this.errorUtil.createNotFoundError(
          'An unexpected error occurred while updating profile.',
          {
            module: this.moduleName,
            method: 'updateProfile',
            trace: {
              error: 'User document not found.',
              log: userId,
            },
          }
        );
      }

      await this.recruiterHelper.updateRecruiter(
        foundRecruiter['id'],
        updateProfileQuery
      );
    } catch (error) {
      throw this.errorUtil.createInternalServerError(
        'An unexpected error occurred while updating profile.',
        {
          module: this.moduleName,
          method: 'updateProfile',
          trace: { error: error.message, log: userId },
        }
      );
    }
  };
}
