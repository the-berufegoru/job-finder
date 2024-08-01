/* eslint-disable @typescript-eslint/no-explicit-any */
import { Association, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../libs';
import { IUser } from '../../interfaces/userInterface';

/**
 * User model class.
 * @class User
 * @extends {Model<IUser>}
 */
class User extends Model<IUser> implements IUser {
  public id!: number;
  public avatarUrl?: object;
  public email!: string;
  public mobileNumber!: string;
  public password!: string;
  public role!: 'admin' | 'candidate' | 'recruiter';
  public isVerified!: boolean;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // User mode
  public static associations: {
    admin: Association<User, any>;
  };

  public static associate(models: any) {
    User.hasOne(models.Admin, {
      foreignKey: 'userId',
      as: 'admin',
      onDelete: 'CASCADE',
    });
    User.hasOne(models.Candidate, {
      foreignKey: 'userId',
      as: 'candidate',
      onDelete: 'CASCADE',
    });
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
    tableName: 'Users',
    timestamps: true,
  }
);

export { User };
