/**
 * @fileoverview Helper class for managing User operations
 * @version 1.0.0
 * @module userHelper
 */
import { Op } from 'sequelize';
import { IUser } from '../../interfaces/userInterface';
import { IUserQuery } from '../../interfaces/query/userQuery';
import { User } from '../models/userModel';

export default class UserHelper {
  private readonly userModel: typeof User;

  constructor() {
    this.userModel = User;
  }

  public createUser = async (userData: IUser): Promise<void | null> => {
    try {
      await this.userModel.create(userData);
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  };

  public getUser = async (userQuery: IUserQuery): Promise<IUser | null> => {
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
