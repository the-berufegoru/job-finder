/**
 * @fileoverview Helper class for managing Candidate operations.
 * @version 1.0.0
 * @module candidateHelper
 */

import { Op, WhereOptions } from 'sequelize';
import { ICandidate } from '../../interfaces/candidateInterface';
import { Candidate } from '../models/candidateModel';
import { ICandidatesQuery } from '../../interfaces/query';
import { User } from '../models/userModel';

/**
 * Helper class for performing operations on Candidate data.
 * @class CandidateHelper
 */
export default class CandidateHelper {
  private readonly candidateModel: typeof Candidate;

  /**
   * Creates an instance of CandidateHelper.
   */
  constructor() {
    this.candidateModel = Candidate;
  }

  /**
   * Builds a Sequelize `where` clause based on the provided query parameters.
   * @param {ICandidatesQuery} candidateQuery - The query parameters for filtering candidates.
   * @returns {WhereOptions} The Sequelize `where` clause.
   */
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

  /**
   * Creates a new candidate in the database.
   * @param {ICandidate} candidateData - The data of the candidate to be created.
   * @returns {Promise<void | null>} A promise that resolves when the candidate is created.
   * @throws {Error} If there is an error during candidate creation.
   */
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

  /**
   * Retrieves a candidate by their user ID.
   * @param {number} userId - The user ID of the candidate to retrieve.
   * @returns {Promise<ICandidate | null>} A promise that resolves with the candidate data or null if not found.
   * @throws {Error} If there is an error during candidate retrieval.
   */
  public getCandidate = async (userId: number): Promise<ICandidate | null> => {
    try {
      const candidate = await this.candidateModel.findOne({
        where: {
          userId: {
            [Op.eq]: userId,
          },
        },
        include: [{ model: User, as: 'user' }],
      });
      return candidate;
    } catch (error) {
      console.error('Error retrieving candidate:', error);
      throw error;
    }
  };

  /**
   * Retrieves a list of candidates based on the provided filters.
   * @param {Partial<ICandidatesQuery>} filters - The filters to apply when retrieving candidates.
   * @returns {Promise<ICandidate[] | null>} A promise that resolves with the list of candidates or null if none found.
   * @throws {Error} If there is an error during candidates retrieval.
   */
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

  /**
   * Updates an existing candidate's data.
   * @param {number} candidateId - The ID of the candidate to update.
   * @param {Partial<ICandidate>} candidateData - The data to update for the candidate.
   * @returns {Promise<void | null>} A promise that resolves when the candidate is updated.
   * @throws {Error} If there is an error during candidate update.
   */
  public updateCandidate = async (
    candidateId: number,
    candidateData: Partial<ICandidate>
  ): Promise<void | null> => {
    try {
      await this.candidateModel.update(candidateData, {
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

  /**
   * Removes a candidate from the database.
   * @param {number} candidateId - The ID of the candidate to remove.
   * @returns {Promise<void | null>} A promise that resolves when the candidate is removed.
   * @throws {Error} If there is an error during candidate removal or if the candidate is not found.
   */
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
