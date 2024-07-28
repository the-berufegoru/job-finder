/**
 * @fileoverview Helper class for managing User operations.
 * @version 1.0.0
 * @module userHelper
 */

import { Op } from 'sequelize';
import { IUser } from '../../interfaces/userInterface';
import { IUserQuery } from '../../interfaces/query/userQuery';
import { User } from '../models/userModel';

/**
 * A helper class for managing User operations such as creating, retrieving, updating, and removing users.
 * @class UserHelper
 */
export default class UserHelper {
  private readonly userModel: typeof User;

  /**
   * Creates an instance of UserHelper.
   */
  constructor() {
    this.userModel = User;
  }

  /**
   * Creates a new user in the database.
   *
   * @param {IUser} userData - The data of the user to create.
   * @returns {Promise<IUser | null>} - A promise that resolves to the created user or null if an error occurs.
   * @throws {Error} - Throws an error if user creation fails.
   */
  public createUser = async (userData: IUser): Promise<IUser | null> => {
    try {
      const user = await this.userModel.create(userData);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  /**
   * Retrieves a user from the database based on the given query.
   *
   * @param {IUserQuery} userQuery - The query parameters for finding the user.
   * @returns {Promise<IUser | null>} - A promise that resolves to the found user or null if not found.
   * @throws {Error} - Throws an error if user retrieval fails.
   */
  public getUser = async (
    userQuery: Partial<IUserQuery>
  ): Promise<IUser | null> => {
    try {
      const user = await this.userModel.findOne({
        where: {
          [Op.or]: [
            {
              id: {
                [Op.eq]: userQuery?.id,
              },
            },
            {
              email: {
                [Op.eq]: userQuery?.email,
              },
            },
          ],
        },
      });
      return user;
    } catch (error) {
      console.error('Error retrieving user:', error);
      throw error;
    }
  };

  /**
   * Updates an existing user in the database.
   *
   * @param {number} userId - The ID of the user to update.
   * @param {Partial<IUser>} userData - The data to update the user with.
   * @returns {Promise<void>} - A promise that resolves when the update operation is complete.
   * @throws {Error} - Throws an error if user update fails.
   */
  public updateUser = async (
    userId: number,
    userData: Partial<IUser>
  ): Promise<void | null> => {
    try {
      const updateCondition = { ...userData };
      await this.userModel.update(updateCondition, {
        where: {
          id: {
            [Op.eq]: userId,
          },
        },
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  };

  /**
   * Removes a user from the database.
   *
   * @param {number} userId - The ID of the user to remove.
   * @returns {Promise<void>} - A promise that resolves when the user removal is complete.
   * @throws {Error} - Throws an error if user removal fails or if the user is not found.
   */
  public removeUser = async (userId: number): Promise<void | null> => {
    try {
      const result = await this.userModel.destroy({
        where: {
          id: {
            [Op.eq]: userId,
          },
        },
      });

      if (result === 0) {
        throw new Error('User not found');
      }
    } catch (error) {
      console.error('Error removing user:', error);
      throw error;
    }
  };
}
