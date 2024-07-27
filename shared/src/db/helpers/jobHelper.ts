/**
 * @fileoverview Helper functions for Job operations
 * @version 1.0.0
 * @module jobHelper
 */

import { Op, WhereOptions } from 'sequelize';
import { IJob } from '../../interfaces/jobInterface';
import { Job } from '../models/jobModel';
import { IJobQuery } from '../../interfaces/query';

export default class JobHelper {
  private readonly jobModel: typeof Job;

  constructor() {
    this.jobModel = Job;
  }

  private buildWhereClause = (jobQuery: IJobQuery): WhereOptions => {
    const whereClause: WhereOptions = {};

    if (jobQuery.title) {
      whereClause['title'] = { [Op.like]: `%${jobQuery.title}%` };
    }

    if (jobQuery.type && Array.isArray(jobQuery.type)) {
      whereClause['type'] = {
        [Op.in]: jobQuery.type.map((type) => ({
          [Op.like]: `%${type}%`,
        })),
      };
    } else if (jobQuery.type) {
      whereClause['type'] = { [Op.like]: `%${jobQuery.type}%` };
    }

    if (jobQuery.location) {
      whereClause['location'] = { [Op.like]: `%${jobQuery.location}%` };
    }

    return whereClause;
  };

  public createJob = async (jobData: IJob): Promise<void | null> => {
    try {
      await this.jobModel.create(jobData);
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  };

  public getJob = async (jobId: number): Promise<IJob | null> => {
    try {
      const job = await this.jobModel.findOne({
        where: {
          id: {
            [Op.eq]: jobId,
          },
        },
      });
      return job;
    } catch (error) {
      console.error('Error retrieving job:', error);
      throw error;
    }
  };

  public getJobs = async (jobsQuery: IJobQuery): Promise<IJob[] | null> => {
    try {
      const jobs = await this.jobModel.findAll({
        where: this.buildWhereClause(jobsQuery),
      });
      return jobs;
    } catch (error) {
      console.error('Error retrieving jobs:', error);
      throw error;
    }
  };

  public updateJob = async (
    jobId: number,
    jobData: IJob
  ): Promise<void | null> => {
    try {
      const updateCondition: Partial<IJob> = { ...jobData };

      await this.jobModel.update(updateCondition, {
        where: { id: { [Op.eq]: jobId } },
        returning: true,
      });
    } catch (error) {
      console.error('Error updating job:', error);
      throw error;
    }
  };

  public removeJob = async (jobId: number): Promise<void | null> => {
    try {
      const result = await this.jobModel.destroy({
        where: { id: { [Op.eq]: jobId } },
      });

      if (result === 0) {
        throw new Error('Job not found');
      }
    } catch (error) {
      console.error('Error removing job:', error);
      throw error;
    }
  };
}
