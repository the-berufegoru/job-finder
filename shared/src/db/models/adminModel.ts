/**
 * @fileoverview Admin model definition
 * @module adminModel
 */

import { Association, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../libs';
import { User } from './userModel';
import { IAdmin } from '../../interfaces/adminInterface';

/**
 * Admin model class.
 * @class Admin
 * @extends {Model<IAdmin>}
 */
class Admin extends Model<IAdmin> implements IAdmin {
  /**
   * Admin ID
   * @type {number}
   */
  public id!: number;

  /**
   * First name of the admin
   * @type {string}
   */
  public firstName!: string;

  /**
   * Last name of the admin
   * @type {string}
   */
  public lastName!: string;

  /**
   * Associated user ID
   * @type {number}
   */
  public userId!: number;

  /**
   * Admin-User association
   * @type {Association<Admin, User>}
   */
  public static associations: {
    user: Association<Admin, User>;
  };

  public static associate() {
    Admin.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  }
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      references: {
        model: User,
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'Admin',
    timestamps: true,
  }
);

export { Admin };
