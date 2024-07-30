/**
 * @fileoverview
 * @version
 * @module
 */
import { AdminDTO, toAdminDTO } from '../dtos';
import { AdminHelper, UserHelper } from '@job-finder/db/helpers';
import { CreateErrorUtil } from '@job-finder/utils';

export default class AdminService {
  private readonly moduleName: string;
  private readonly adminHelper: AdminHelper;
  private readonly userHelper: UserHelper;
  private readonly errorUtil: CreateErrorUtil;

  constructor() {
    this.moduleName = 'admin.service';
    this.adminHelper = new AdminHelper();
    this.userHelper = new UserHelper();
    this.errorUtil = new CreateErrorUtil();
  }

  public async getAdmin(userId: number): Promise<{ admin: AdminDTO }> {
    try {
      const foundAdmin = await this.adminHelper.getAdmin(userId);
      if (!foundAdmin) {
        throw this.errorUtil.createNotFoundError(
          'We ran into an issue while loading profile.',
          {
            module: this.moduleName,
            method: 'getAdmin',
            trace: {
              error: 'Admin document not found.',
              log: userId,
            },
          }
        );
      }

      const adminDto: AdminDTO = toAdminDTO(foundAdmin);

      return { admin: adminDto };
    } catch (error) {
      throw this.errorUtil.createInternalServerError(
        'An unexpected error occurred while loading profile.',
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
  }

  public removeAdmin = async (userId: number): Promise<void> => {
    try {
      const foundAdmin = await this.adminHelper.getAdmin(userId);
      if (!foundAdmin) {
        throw this.errorUtil.createNotFoundError(
          'We ran into an issue while loading profile.',
          {
            module: this.moduleName,
            method: 'removeAdmin',
            trace: {
              error: 'Admin document not found.',
              log: userId,
            },
          }
        );
      }


      await this.adminHelper.removeAdmin(foundAdmin.userId);
    } catch (error) {
      throw this.errorUtil.createInternalServerError(
        'An unexpected error occurred removing account.',
        {
          module: this.moduleName,
          method: 'removeAdmin',
          trace: {
            error: error.message,
            log: userId,
          },
        }
      );
    }
  };
}
