/**
 * @fileoverview Provides services for managing admin profiles.
 * @version 1.0.0
 * @module AdminService
 */
import { AdminDTO, toAdminDTO } from '../dtos';
import { AdminHelper, UserHelper } from '@job-finder/db/helpers';
import { IAdmin } from '@job-finder/interfaces';
import { CreateErrorUtil } from '@job-finder/utils';

/**
 * Service class for handling admin-related operations.
 * @class AdminService
 */
export default class AdminService {
  private readonly moduleName: string;
  private readonly adminHelper: AdminHelper;
  private readonly userHelper: UserHelper;
  private readonly errorUtil: CreateErrorUtil;

  /**
   * Creates an instance of AdminService.
   */
  constructor(moduleName: string) {
    this.moduleName = moduleName;
    this.adminHelper = new AdminHelper();
    this.userHelper = new UserHelper();
    this.errorUtil = new CreateErrorUtil();
  }

  /**
   * Retrieves an admin profile by user ID.
   * @param {number} userId - The ID of the user.
   * @returns {Promise<{ admin: AdminDTO }>} The admin profile data.
   * @throws {NotFoundError} If the admin is not found.
   * @throws {InternalServerError} If an unexpected error occurs.
   */
  public getAdmin = async (userId: number): Promise<{ admin: AdminDTO }> => {
    try {
      const foundAdmin = await this.adminHelper.getAdmin(userId);
      if (!foundAdmin) {
        throw this.errorUtil.createNotFoundError('Admin profile not found.', {
          module: this.moduleName,
          method: 'getAdmin',
          trace: {
            error: 'Admin document not found.',
            log: userId,
          },
        });
      }

      const adminDto: AdminDTO = toAdminDTO(foundAdmin);
      return { admin: adminDto };
    } catch (error) {
      throw this.errorUtil.createInternalServerError(
        'An unexpected error occurred while loading the admin profile.',
        {
          module: this.moduleName,
          method: 'getAdmin',
          trace: {
            error: error.message,
            log: userId,
          },
        }
      );
    }
  };

  /**
   * Updates an admin profile.
   * @param {number} userId - The ID of the user.
   * @param {Partial<IAdmin>} updateQuery - The fields to update.
   * @returns {Promise<void>}
   * @throws {NotFoundError} If the admin is not found.
   * @throws {InternalServerError} If an unexpected error occurs.
   */
  public updateAdmin = async (
    userId: number,
    updateQuery: Partial<IAdmin>
  ): Promise<void> => {
    try {
      const foundAdmin = await this.adminHelper.getAdmin(userId);
      if (!foundAdmin) {
        throw this.errorUtil.createNotFoundError('Admin profile not found.', {
          module: this.moduleName,
          method: 'updateAdmin',
          trace: {
            error: 'Admin document not found.',
            log: userId,
          },
        });
      }

      await this.adminHelper.updateAdmin(userId, updateQuery);
    } catch (error) {
      throw this.errorUtil.createInternalServerError(
        'An unexpected error occurred while updating the admin profile.',
        {
          module: this.moduleName,
          method: 'updateAdmin',
          trace: {
            error: error.message,
            log: userId,
          },
        }
      );
    }
  };
}
