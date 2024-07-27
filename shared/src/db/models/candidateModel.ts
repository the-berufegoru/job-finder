/**
 * @fileoverview Candidate Model Definition
 * @version 1.0.0
 * @module candidateModel
 */
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../../libs';
import { User } from './userModel';
import { ICandidate } from '../../interfaces/candidateInterface';

/**
 * Candidate model class.
 * @class Candidate
 * @extends {Model<ICandidate>}
 */
class Candidate extends Model<ICandidate> implements ICandidate {
  /**
   * Candidate ID
   * @type {number}
   */
  public id!: number;

  /**
   * Candidate first name
   * @type {string}
   */
  public firstName!: string;

  /**
   * Candidate last name
   * @type {string}
   */
  public lastName!: string;

  /**
   * Candidate title
   * @type {'Mr' | 'Mrs' | 'Ms' | 'Miss' | 'Dr' | 'Prof' | 'Rev' | 'Capt' | 'Sir' | 'Madam' | 'Mx' | 'Rather Not Say'}
   */
  public title?:
    | 'Mr'
    | 'Mrs'
    | 'Ms'
    | 'Miss'
    | 'Dr'
    | 'Prof'
    | 'Rev'
    | 'Capt'
    | 'Sir'
    | 'Madam'
    | 'Mx'
    | 'Rather Not Say';

  /**
   * Candidate skills
   * @type {string[]}
   */
  public skills?: string[];

  /**
   * Employment status
   * @type {boolean}
   */
  public isEmployed?: boolean;

  /**
   * Associated user ID
   * @type {number}
   */
  public userId!: number;

  /**
   * Timestamps
   * @type {Date}
   */
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Candidate.init(
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
    title: {
      type: DataTypes.ENUM(
        'Mr',
        'Mrs',
        'Ms',
        'Miss',
        'Dr',
        'Prof',
        'Rev',
        'Capt',
        'Sir',
        'Madam',
        'Mx',
        'Rather Not Say'
      ),
      allowNull: true,
      defaultValue: 'Rather Not Say',
    },
    skills: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    isEmployed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
    modelName: 'Candidate',
    timestamps: true,
  }
);

// Define associations
Candidate.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export { Candidate };
