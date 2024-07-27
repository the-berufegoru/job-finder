/**
 * @fileoverview Job Model Definition
 * @version 1.0.0
 * @module jobModel
 */
import { DataTypes, Model, Association } from 'sequelize';
import { sequelize } from '../../libs';
import { Recruiter } from './recruiterModel';
import { IJob } from '../../interfaces/jobInterface';
import { Application } from './applicationModel';

/**
 * Job model class.
 * @class Job
 * @extends {Model<IJob>}
 */
class Job extends Model<IJob> implements IJob {
  /**
   * Job ID
   * @type {number}
   */
  public id!: number;

  /**
   * Job title
   * @type {string}
   */
  public title!: string;

  /**
   * Job description
   * @type {string}
   */
  public description!: string;

  /**
   * Job responsibility
   * @type {string}
   */
  public responsibility!: string;

  /**
   * Job requirements
   * @type {string[]}
   */
  public requirements!: string[];

  /**
   * Job benefits
   * @type {string[]}
   */
  public benefits?: string[];

  /**
   * Job location
   * @type {string}
   */
  public location!: string;

  /**
   * Job type
   * @type {'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | 'Internship'}
   */
  public type!:
    | 'Full-time'
    | 'Part-time'
    | 'Contract'
    | 'Freelance'
    | 'Internship';

  /**
   * Job vacancy
   * @type {number}
   */
  public vacancy?: number;

  /**
   * Job deadline
   * @type {Date}
   */
  public deadline!: Date;

  /**
   * Job tags
   * @type {string[]}
   */
  public tags!: string[];

  /**
   * Recruiter ID
   * @type {number}
   */
  public recruiterId!: number;

  /**
   * Job views
   * @type {number}
   */
  public views?: number;

  /**
   * Job active status
   * @type {boolean}
   */
  public isActive?: boolean;

  /**
   * Job creation timestamp
   * @type {Date}
   */
  public readonly createdAt!: Date;

  /**
   * Job update timestamp
   * @type {Date}
   */
  public readonly updatedAt!: Date;

  /**
   * Recruiter association
   * @type {Association<Job, Recruiter>}
   */
  public static associations: {
    recruiter: Association<Job, Recruiter>;
    applications: Association<Job, Application>;
  };
}

Job.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responsibility: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    requirements: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    benefits: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(
        'Full-time',
        'Part-time',
        'Contract',
        'Freelance',
        'Internship'
      ),
      allowNull: false,
      defaultValue: 'Full-time',
    },
    vacancy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    recruiterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Recruiter,
        key: 'id',
      },
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'Job',
    timestamps: true,
  }
);

// Define associations
Job.belongsTo(Recruiter, { foreignKey: 'recruiterId', as: 'recruiter' });
Job.hasMany(Application, { foreignKey: 'jobId', as: 'applications' });

export { Job };
