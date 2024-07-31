/**
 * @fileoverview This module defines the UserService class, responsible for managing user-related operations such as updating contact details and passwords.
 * @module UserService
 * @version 1.0.0
 */

import bcrypt from 'bcrypt';
import PasswordTemplate from '../templates/passwordTemplate';
import { UserHelper } from '../db/helpers';
import { CreateErrorUtil, NotificationUtil } from '../utils';
import { IUpdateContactQuery, IUpdatePasswordQuery } from '../interfaces/query';
import { compareStrings } from '../validators';
import { notificationConfig } from '../configs';

/**
 * Class representing the UserService, which handles user-related operations.
 */
export default class UserService {
  private readonly moduleName: string;
  private readonly errorUtil: CreateErrorUtil;
  private readonly notificationUtil: NotificationUtil;
  private readonly userHelper: UserHelper;
  private readonly passwordTemplate: PasswordTemplate;

  /**
   * Creates an instance of UserService.
   * @param {string} moduleName - The name of the module.
   */
  constructor(moduleName: string) {
    this.moduleName = moduleName;
    this.errorUtil = new CreateErrorUtil();
    this.notificationUtil = new NotificationUtil();
    this.userHelper = new UserHelper();
    this.passwordTemplate = new PasswordTemplate();
  }

  /**
   * Updates the contact details of a user.
   * @param {number} userId - The ID of the user whose contact details are being updated.
   * @param {IUpdateContactQuery} contactQuery - The contact details to update (email and/or phone number).
   * @returns {Promise<void>} A promise that resolves when the contact details are updated.
   * @throws Will throw an error if updating the contact details fails.
   */
  public updateContact = async (
    userId: number,
    contactQuery: IUpdateContactQuery
  ): Promise<void> => {
    try {
      const contactCondition: Partial<IUpdateContactQuery> = {};

      if (contactQuery?.['email']) {
        contactCondition.email = contactQuery.email;
      }

      if (contactQuery?.['phoneNumber']) {
        contactCondition.phoneNumber = contactQuery.phoneNumber;
      }

      if (Object.keys(contactCondition).length === 0) {
        return;
      }

      await this.userHelper.updateUser(userId, contactCondition);
    } catch (error) {
      throw this.errorUtil.createInternalServerError(
        'Failed to update user contact information.',
        {
          module: this.moduleName,
          method: 'updateContact',
          trace: {
            error: error.message,
            log: userId,
          },
        }
      );
    }
  };

  /**
   * Updates the password of a user.
   * @param {number} userId - The ID of the user whose password is being updated.
   * @param {IUpdatePasswordQuery} passwordQuery - The password details including current, new, and confirm passwords.
   * @returns {Promise<void>} A promise that resolves when the password is updated.
   * @throws Will throw an error if if the passwords do not match, or if the current password is incorrect.
   */
  public updatePassword = async (
    userId: number,
    passwordQuery: IUpdatePasswordQuery
  ): Promise<void> => {
    try {
      const foundUser = await this.userHelper.getUser({ id: userId });

      if (
        !compareStrings(
          passwordQuery.newPassword,
          passwordQuery.confirmPassword
        )
      ) {
        throw this.errorUtil.createValidationError(
          'New and confirm passwords do not match.',
          {
            module: this.moduleName,
            method: 'updatePassword',
            trace: {
              error: 'New and confirm passwords do not match.',
              log: userId,
            },
          }
        );
      }

      const hashedPassword = await bcrypt.hash(passwordQuery.newPassword, 12);
      await this.userHelper.updateUser(foundUser.id, {
        password: hashedPassword,
      });

      await this.notificationUtil.sendEmail(
        foundUser.email,
        `${notificationConfig.mailgen.product.name} account password update`,
        this.passwordTemplate.passwordUpdate(foundUser.email, {
          ip: '127.0.0.1',
          timestamp: Date.now().toString(),
        })
      );
    } catch (error) {
      throw this.errorUtil.createInternalServerError(
        'An unexpected error occurred while updating password.',
        {
          module: this.moduleName,
          method: 'updatePassword',
          trace: {
            error: error.message,
            log: userId,
          },
        }
      );
    }
  };
}
