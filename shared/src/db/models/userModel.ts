/**
 * @fileoverview User model definition
 * @module userModel
 */

import { Association, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../libs';
import { IUser } from '../../interfaces/userInterface';
import { Admin } from './adminModel';

/**
 * User model class.
 * @class User
 * @extends {Model<IUser>}
 */
class User extends Model<IUser> implements IUser {
  /**
   * User ID
   * @type {number}
   */
  public id!: number;

  /**
   * Avatar URL of the User
   * @type {object | undefined}
   */
  public avatarUrl?: object;

  /**
   * User Email
   * @type {string}
   */
  public email!: string;

  /**
   * Mobile Number of the User
   * @type {string}
   */
  public mobileNumber!: string;

  /**
   * User Password
   * @type {string}
   */
  public password!: string;

  /**
   * Role of the User
   * @type {'admin' | 'candidate' | 'recruiter'}
   */
  public role!: 'admin' | 'candidate' | 'recruiter';

  /**
   * Verification status of the User
   * @type {boolean}
   */
  public isVerified!: boolean;

  /**
   * Timestamps for the User model
   * @readonly
   * @type {Date}
   */
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  /**
   * Association with Admin model
   * @type {Association<User, Admin>}
   */
  public static associations: {
    admin: Association<User, Admin>;
  };

  /**
   * Set up associations
   */
  public static associate() {
    User.hasOne(Admin, { foreignKey: 'userId', as: 'admin' });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    avatarUrl: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('admin', 'candidate', 'recruiter'),
      allowNull: false,
      defaultValue: 'candidate',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
  }
);

export { User };
