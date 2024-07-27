/**
 * @fileoverview Helper functions for Recruiter operations
 * @version 1.0.0
 * @module recruiterHelper
 */

import { Op, WhereOptions } from 'sequelize';
import { IRecruiter } from '../../interfaces/recruiterInterface';
import { Recruiter } from '../models/recruiterModel';
import { IRecruiterQuery, IRecruitersQuery } from '../../interfaces/query';

export default class RecruiterHelper {
  private readonly recruiterModel: typeof Recruiter;

  /**
   * Constructs the RecruiterHelper instance.
   */
  constructor() {
    this.recruiterModel = Recruiter;
  }

  private buildWhereClause = (
    recruitersQuery: IRecruitersQuery
  ): WhereOptions => {
    const whereClause: WhereOptions = {};

    if (recruitersQuery.name) {
      whereClause['name'] = { [Op.like]: `%${recruitersQuery.name}%` };
    }
    if (recruitersQuery.industry) {
      whereClause['industry'] = { [Op.like]: `%${recruitersQuery.industry}%` };
    }
    if (recruitersQuery.location) {
      whereClause['location'] = { [Op.like]: `%${recruitersQuery.location}%` };
    }
    if (recruitersQuery.isVerified !== undefined) {
      whereClause['isVerified'] = recruitersQuery.isVerified;
    }

    return whereClause;
  };

  public createRecruiter = async (
    recruiterData: IRecruiter
  ): Promise<void | null> => {
    try {
      await this.recruiterModel.create(recruiterData);
    } catch (error) {
      console.error('Error creating recruiter', error);
      throw error;
    }
  };

  public getRecruiter = async (
    recruiterQuery: IRecruiterQuery
  ): Promise<IRecruiter | null> => {
    try {
      const recruiter = await this.recruiterModel.findOne({
        where: {
          [Op.or]: [
            { id: { [Op.eq]: recruiterQuery.id } },
            { userId: { [Op.eq]: recruiterQuery.userId } },
          ],
        },
      });
      return recruiter;
    } catch (error) {
      console.error('Error retrieving recruiter', error);
      throw error;
    }
  };

  public getRecruiters = async (
    recruitersQuery: IRecruitersQuery
  ): Promise<IRecruiter[] | null> => {
    try {
      const recruiters = await this.recruiterModel.findAll({
        where: this.buildWhereClause(recruitersQuery),
      });

      return recruiters;
    } catch (error) {
      console.error('Error retrieving recruiters', error);
      throw error;
    }
  };

  public updateRecruiter = async (
    recruiterId: number,
    recruiterData: IRecruiter
  ): Promise<void | null> => {
    try {
      const updateCondition: Partial<IRecruiter> = { ...recruiterData };

      await this.recruiterModel.update(updateCondition, {
        where: { id: { [Op.eq]: recruiterId } },
        returning: true,
      });
    } catch (error) {
      console.error('Error updating recruiter:', error);
      throw error;
    }
  };

  public removeRecruiter = async (
    recruiterId: number
  ): Promise<void | null> => {
    try {
      const result = await this.recruiterModel.destroy({
        where: { id: { [Op.eq]: recruiterId } },
      });

      if (result === 0) {
        throw new Error('Recruiter not found');
      }
    } catch (error) {
      console.error('Error removing recruiter:', error);
      throw error;
    }
  };
}
