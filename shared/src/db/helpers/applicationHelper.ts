/**
 * @fileoverview Helper class for managing Application operations
 * @version 1.0.0
 * @module applicationHelper
 */

import { Op, WhereOptions } from 'sequelize';
import { IApplication } from '../../interfaces/applicationInterface';
import { Application } from '../models/applicationModel';
import { IApplicationQuery } from '../../interfaces/query';

export default class ApplicationHelper {
  private readonly applicationModel: typeof Application;

  private buildWhereClause = (
    applicationFilters: IApplicationQuery
  ): WhereOptions => {
    const whereClause: WhereOptions = {};

    if (applicationFilters.jobId) {
      whereClause['jobId'] = { [Op.eq]: `%${applicationFilters.jobId}%` };
    }

    if (applicationFilters.candidateId) {
      whereClause['candidateId'] = {
        [Op.eq]: `%${applicationFilters.candidateId}%`,
      };
    }

    if (applicationFilters.status) {
      whereClause['status'] = { [Op.like]: `%${applicationFilters.status}%` };
    }

    return whereClause;
  };

  constructor() {
    this.applicationModel = Application;
  }

  public createApplication = async (
    applicationData: IApplication
  ): Promise<void | null> => {
    try {
      await this.applicationModel.create(applicationData);
    } catch (error) {
      console.error('Error creating application:', error);
      throw error;
    }
  };

  public getApplication = async (
    applicationId: number
  ): Promise<Application | null> => {
    try {
      const application = await this.applicationModel.findOne({
        where: {
          id: {
            [Op.eq]: applicationId,
          },
        },
      });
      return application;
    } catch (error) {
      console.error('Error retrieving application:', error);
      throw error;
    }
  };

  public getApplications = async (
    filters: Partial<IApplication>
  ): Promise<Application[] | null> => {
    try {
      const whereClause = this.buildWhereClause(filters);
      const applications = await this.applicationModel.findAll({
        where: whereClause,
      });
      return applications;
    } catch (error) {
      console.error('Error retrieving applications:', error);
      throw error;
    }
  };

  public updateApplication = async (
    applicationId: number,
    applicationData: Partial<IApplication>
  ): Promise<void | null> => {
    try {
      const updateCondition: Partial<IApplication> = { ...applicationData };

      await this.applicationModel.update(updateCondition, {
        where: {
          id: {
            [Op.eq]: applicationId,
          },
        },
        returning: true,
      });
    } catch (error) {
      console.error('Error updating application:', error);
      throw error;
    }
  };

  public removeApplication = async (
    applicationId: number
  ): Promise<void | null> => {
    try {
      const result = await this.applicationModel.destroy({
        where: {
          id: {
            [Op.eq]: applicationId,
          },
        },
      });

      if (result === 0) {
        throw new Error('Application not found');
      }
    } catch (error) {
      console.error('Error removing application:', error);
      throw error;
    }
  };
}
