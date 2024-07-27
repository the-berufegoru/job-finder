/**
 * @fileoverview Helper class for managing Candidate operations
 * @version 1.0.0
 * @module candidateHelper
 */

import { Op, WhereOptions } from 'sequelize';
import { ICandidate } from '../../interfaces/candidateInterface';
import { Candidate } from '../models/candidateModel';
import { ICandidateQuery, ICandidatesQuery } from '../../interfaces/query';

export default class CandidateHelper {
  private readonly candidateModel: typeof Candidate;

  constructor() {
    this.candidateModel = Candidate;
  }

  private buildWhereClause = (
    candidateQuery: ICandidatesQuery
  ): WhereOptions => {
    const whereClause: WhereOptions = {};

    if (candidateQuery.isEmployed !== undefined) {
      whereClause['isEmployed'] = {
        [Op.like]: `%${candidateQuery.isEmployed}%`,
      };
    }

    if (candidateQuery.skills && Array.isArray(candidateQuery.skills)) {
      whereClause['skills'] = {
        [Op.in]: candidateQuery.skills.map((skill) => ({
          [Op.like]: `%${skill}%`,
        })),
      };
    } else if (candidateQuery.skills) {
      whereClause['skills'] = { [Op.like]: `%${candidateQuery.skills}%` };
    }

    return whereClause;
  };

  public createCandidate = async (
    candidateData: ICandidate
  ): Promise<void | null> => {
    try {
      await this.candidateModel.create(candidateData);
    } catch (error) {
      console.error('Error creating candidate:', error);
      throw error;
    }
  };

  public getCandidate = async (
    candidateQuery: Partial<ICandidateQuery>
  ): Promise<ICandidate | null> => {
    try {
      const candidate = await this.candidateModel.findOne({
        where: {
          [Op.or]: [
            {
              id: {
                [Op.eq]: candidateQuery.id,
              },
            },
            {
              userId: {
                [Op.eq]: candidateQuery.userId,
              },
            },
          ],
        },
      });
      return candidate;
    } catch (error) {
      console.error('Error retrieving candidate:', error);
      throw error;
    }
  };

  public getCandidates = async (
    filters: Partial<ICandidatesQuery>
  ): Promise<ICandidate[] | null> => {
    try {
      const whereClause = this.buildWhereClause(filters);
      const candidates = await this.candidateModel.findAll({
        where: whereClause,
      });

      return candidates;
    } catch (error) {
      console.error('Error retrieving candidates:', error);
      throw error;
    }
  };

  public updateCandidate = async (
    candidateId: number,
    candidateData: ICandidate
  ): Promise<void | null> => {
    try {
      const updateCondition: Partial<ICandidate> = { ...candidateData };

      await this.candidateModel.update(updateCondition, {
        where: {
          id: {
            [Op.eq]: candidateId,
          },
        },
        returning: true,
      });
    } catch (error) {
      console.error('Error updating candidate:', error);
      throw error;
    }
  };

  public removeCandidate = async (
    candidateId: number
  ): Promise<void | null> => {
    try {
      const result = await this.candidateModel.destroy({
        where: {
          id: {
            [Op.eq]: candidateId,
          },
        },
      });

      if (result === 0) {
        throw new Error('Candidate not found');
      }
    } catch (error) {
      console.error('Error removing candidate:', error);
      throw error;
    }
  };
}
