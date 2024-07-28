/**
 * @fileoverview Application model definition
 * @version 1.0.0
 * @module applicationModel
 */

import { Association, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../libs';
import { Candidate } from './candidateModel';
import { Job } from './jobModel';
import { IApplication } from '../../interfaces/applicationInterface';

/**
 * Application model class.
 * @class Application
 * @extends {Model<IApplication>}
 */
class Application extends Model<IApplication> implements IApplication {
  /**
   * Application ID
   * @type {number}
   */
  public id!: number;

  /**
   * Associated job ID
   * @type {number}
   */
  public jobId!: number;

  /**
   * Associated candidate ID
   * @type {number}
   */
  public candidateId!: number;

  /**
   * Application status
   * @type {'Pending' | 'Approved' | 'Shortlisted' | 'Rejected'}
   */
  public status!: 'Pending' | 'Approved' | 'Shortlisted' | 'Rejected';

  public static associations: {
    job: Association<Application, Job>;
    candidate: Association<Application, Candidate>;
  };

  public static associate() {
    Application.belongsTo(Job, { foreignKey: 'jobId', as: 'job' });
    Application.belongsTo(Candidate, {
      foreignKey: 'candidateId',
      as: 'candidate',
    });
  }
}

Application.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    jobId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Job,
        key: 'id',
      },
    },
    candidateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Candidate,
        key: 'id',
      },
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Approved', 'Shortlisted', 'Rejected'),
      allowNull: true,
      defaultValue: 'Pending',
    },
  },
  {
    sequelize,
    modelName: 'Application',
    timestamps: true,
  }
);

// Application associations

export { Application };
