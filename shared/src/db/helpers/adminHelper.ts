/**
 * @fileoverview Helper class for managing Admin operations
 * @version 1.0.0
 * @module adminHelper
 */
import { Op } from 'sequelize';
import { IAdmin } from '../../interfaces/adminInterface';
import { Admin } from '../models/adminModel';
import { User } from '../models/userModel';

export default class AdminHelper {
  private readonly adminModel: typeof Admin;

  constructor() {
    this.adminModel = Admin;
  }

  /**
   * Creates a new admin.
   * @param {IAdmin} adminData - The data of the admin to create.
   * @returns {Promise<IAdmin>} The created admin.
   */
  public createAdmin = async (adminData: IAdmin): Promise<void | null> => {
    try {
      await this.adminModel.create(adminData);
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  };

  /**
   * Retrieves an admin by userId.
   * @param {number} userId - The ID of the admin to retrieve.
   * @returns {Promise<IAdmin>} The retrieved admin.
   */
  public getAdmin = async (userId: number): Promise<IAdmin | null> => {
    try {
      const admin = await Admin.findOne({
        where: {
          userId: {
            [Op.eq]: userId,
          },
        },
        include: [{ model: User, as: 'user' }],
      });

      return admin;
    } catch (error) {
      console.error('Error retrieving admin:', error);
      throw error;
    }
  };

  /**
   * Retrieves all admins.
   * @returns {Promise<IAdmin[]>} The retrieved admins.
   */
  public getAdmins = async (): Promise<IAdmin[] | null> => {
    try {
      const admins = await this.adminModel.findAll({
        include: [
          {
            model: User,
            as: 'user',
          },
        ],
      });
      return admins;
    } catch (error) {
      console.error('Error retrieving admins:', error);
      throw error;
    }
  };

  /**
   * Updates an admin by userId.
   * @param {string} userId - The ID of the admin to update.
   * @param {IAdmin} adminData - The updated data for the admin.
   * @returns {Promise<IAdmin>} The updated admin.
   */
  public updateAdmin = async (
    userId: string,
    adminData: Partial<IAdmin>
  ): Promise<void | null> => {
    try {
      const updateCondition: Partial<IAdmin> = { ...adminData };

      await this.adminModel.update(updateCondition, {
        where: {
          id: {
            [Op.eq]: userId,
          },
        },
        returning: true,
      });
    } catch (error) {
      console.error('Error updating admin:', error);
      throw error;
    }
  };

  /**
   * Removes an admin by userId.
   * @param {number | string} userId - The ID of the admin to remove.
   * @returns {Promise<void>} - A promise that resolves when the admin is removed.
   * @throws {Error} - Throws if an error occurs during removal.
   */
  public removeAdmin = async (userId: number | string): Promise<void> => {
    try {
      const result = await this.adminModel.destroy({
        where: {
          userId: {
            [Op.eq]: userId,
          },
        },
      });

      if (result === 0) {
        throw new Error(`Admin with userId ${userId} not found.`);
      }

      console.log(`Admin with userId ${userId} has been removed.`);
    } catch (error) {
      console.error('Error removing admin:', error.message);
      throw new Error(`Failed to remove admin: ${error.message}`);
    }
  };
}
