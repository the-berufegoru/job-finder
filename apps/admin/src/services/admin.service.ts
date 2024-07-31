/**
 * @fileoverview Provides services for managing admin profiles.
 * @version 1.0.0
 * @module AdminService
 */
import bcrypt from 'bcrypt';
import { AdminDTO, toAdminDTO } from '../dtos';
import { AdminHelper, UserHelper } from '@job-finder/db/helpers';
import { IAdmin } from '@job-finder/interfaces';
import { IUpdateContactQuery,  IUpdatePasswordQuery } from '@job-finder/interfaces';
import { CreateErrorUtil, CustomAPIError } from '@job-finder/utils';
import { UserService } from '@job-finder/services';

/**
 * Service class for handling admin-related operations.
 * @class AdminService
 */
export default class AdminService {
  private readonly moduleName: string;
  private readonly adminHelper: AdminHelper;
  private readonly userHelper: UserHelper;
  private readonly errorUtil: CreateErrorUtil;
  private readonly userService: UserService;

  /**
   * Creates an instance of AdminService.
   */
  constructor() {
    this.moduleName = 'admin.service';
    this.adminHelper = new AdminHelper();
    this.userHelper = new UserHelper();
    this.errorUtil = new CreateErrorUtil();
    this.userService = new UserService('admin.service');
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

  /**
   * Updates the user's contact information based on the provided contact query.
   *
   * @param {number} userId - The ID of the user whose contact details are being updated.
   * @param {IUpdateContactQuery} contactQuery - The query object containing the contact details (email, phoneNumber) to be updated.
   * @returns {Promise<void>} - Resolves with no value if the contact details are successfully updated.
   * @throws {Error} - Throws an error if the contact query is empty, if the user is not found, or if an unexpected error occurs during the update.
   */
  public updateContact = async (
    userId: number,
    contactQuery: IUpdateContactQuery
  ): Promise<void> => {
    if (!contactQuery || Object.keys(contactQuery).length === 0) {
      throw this.errorUtil.createBadRequestError(
        'Contact update payload is empty or undefined.',
        {
          module: this.moduleName,
          method: 'updateContact',
          trace: { log: userId },
        }
      );
    }

    try {
      const foundUser = await this.userHelper.getUser({ id: userId });
      if (!foundUser) {
        throw this.errorUtil.createBadRequestError(
          'User not found. Unable to update contact details.',
          {
            module: this.moduleName,
            method: 'updateContact',
            trace: { error: 'User document not found.', log: userId },
          }
        );
      }

      const updatedContactQuery = {
        ...foundUser,
        ...contactQuery,
      };

      await this.userService.updateContact(foundUser.id, updatedContactQuery);
    } catch (error) {
      throw this.errorUtil.createInternalServerError(
        'An unexpected error occurred during contact update.',
        {
          module: this.moduleName,
          method: 'updateContact',
          trace: { error: error.message, log: userId },
        }
      );
    }
  };

  /**
   * Updates the user's password based on the provided password query.
   *
   * @param {number} userId - The ID of the user whose password is being updated.
   * @param {IUpdatePasswordQuery} passwordQuery - The query object containing the current, new, and confirm passwords.
   * @returns {Promise<void>} - Resolves with no value if the password is successfully updated.
   * @throws {Error} - Throws an error if the password query is empty, if the user is not found, or if an unexpected error occurs during the update.
   */
  public updatePassword = async (
    userId: number,
    passwordQuery: IUpdatePasswordQuery
  ): Promise<void> => {
    if (!passwordQuery || Object.keys(passwordQuery).length === 0) {
      throw this.errorUtil.createBadRequestError(
        'Password update payload is empty or undefined.',
        {
          module: this.moduleName,
          method: 'updatePassword',
          trace: { log: userId },
        }
      );
    }

    try {
      const foundUser = await this.userHelper.getUser({ id: userId });
      if (!foundUser) {
        throw this.errorUtil.createBadRequestError(
          'User not found. Unable to update password.',
          {
            module: this.moduleName,
            method: 'updatePassword',
            trace: { error: 'User document not found.', log: userId },
          }
        );
      }

      // Validate the current password
      const isCurrentPasswordValid = await bcrypt.compare(
        passwordQuery.currentPassword,
        foundUser.password
      );
      if (!isCurrentPasswordValid) {
        throw this.errorUtil.createBadRequestError(
          'Current password is incorrect.',
          {
            module: this.moduleName,
            method: 'updatePassword',
            trace: {
              error: 'Current password is incorrect.',
              log: userId,
            },
          }
        );
      }

      // Check if the new password is the same as the current password
      const isNewPasswordSame = await bcrypt.compare(
        passwordQuery.newPassword,
        foundUser.password
      );
      if (isNewPasswordSame) {
        throw this.errorUtil.createBadRequestError(
          'New password cannot be the same as the current password.',
          {
            module: this.moduleName,
            method: 'updatePassword',
            trace: {
              error: 'New password and current password are the same.',
              log: userId,
            },
          }
        );
      }

      // Proceed with updating the password
      await this.userService.updatePassword(foundUser.id, passwordQuery);
    } catch (error) {
      // Ensure that specific known errors are returned with their custom messages
      if (error instanceof CustomAPIError) {
        throw error; // Re-throw known errors to be handled by the appropriate handler
      }

      // Handle unexpected errors
      throw this.errorUtil.createInternalServerError(
        'An unexpected error occurred during password update.',
        {
          module: this.moduleName,
          method: 'updatePassword',
          trace: { error: error.message, log: userId },
        }
      );
    }
  };

  /**
   * Removes an admin and associated user.
   * @param {number} userId - The ID of the user to remove.
   * @returns {Promise<void>}
   * @throws {NotFoundError} If the admin is not found.
   * @throws {InternalServerError} If an unexpected error occurs.
   */
  public removeAdmin = async (userId: number): Promise<void> => {
    try {
      const foundAdmin = await this.adminHelper.getAdmin(userId);
      if (!foundAdmin) {
        throw this.errorUtil.createNotFoundError('Admin profile not found.', {
          module: this.moduleName,
          method: 'removeAdmin',
          trace: {
            error: 'Admin document not found.',
            log: userId,
          },
        });
      }

      await this.userHelper.removeUser(foundAdmin.userId);
    } catch (error) {
      throw this.errorUtil.createInternalServerError(
        'An unexpected error occurred while removing the admin account.',
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
