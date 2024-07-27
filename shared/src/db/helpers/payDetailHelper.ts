/**
 * @fileoverview Helper class for managing PayDetail operations
 * @version 1.0.0
 * @module payDetailHelper
 */
import { Op } from 'sequelize';
import { IPayDetail } from '../../interfaces/payslipInterface';
import { PayDetail } from '../models/paydetailModel';

export default class PayDetailHelper {
  private readonly payDetailModel: typeof PayDetail;

  constructor() {
    this.payDetailModel = PayDetail;
  }

  /**
   * Creates a new pay detail record in the database.
   * @param {IPayDetail} payDetailData - The data of the pay detail to be created.
   * @returns {Promise<void | null>} - A promise that resolves when the operation completes.
   * @throws {Error} - Throws an error if the operation fails.
   */
  public createPayDetail = async (
    payDetailData: IPayDetail
  ): Promise<void | null> => {
    try {
      await this.payDetailModel.create(payDetailData);
    } catch (error) {
      console.error('Error creating pay detail:', error);
      throw error;
    }
  };

  /**
   * Retrieves a pay detail record from the database by its ID.
   * @param {number} payDetailId - The ID of the pay detail to be retrieved.
   * @returns {Promise<IPayDetail | null>} - A promise that resolves to the retrieved pay detail or null if not found.
   * @throws {Error} - Throws an error if the operation fails.
   */
  public getPayDetail = async (
    payDetailId: number
  ): Promise<IPayDetail | null> => {
    try {
      const payDetail = await this.payDetailModel.findByPk(payDetailId);
      return payDetail;
    } catch (error) {
      console.error('Error retrieving pay detail:', error);
      throw error;
    }
  };

  /**
   * Updates a pay detail record in the database.
   * @param {number} payDetailId - The ID of the pay detail to be updated.
   * @param {Partial<IPayDetail>} payDetailData - The new data for the pay detail.
   * @returns {Promise<void | null>} - A promise that resolves when the operation completes.
   * @throws {Error} - Throws an error if the operation fails.
   */
  public updatePayDetail = async (
    payDetailId: number,
    payDetailData: Partial<IPayDetail>
  ): Promise<void | null> => {
    try {
      const updateCondition = { ...payDetailData };

      await this.payDetailModel.update(updateCondition, {
        where: {
          id: {
            [Op.eq]: payDetailId,
          },
        },
      });
    } catch (error) {
      console.error('Error updating pay detail:', error);
      throw error;
    }
  };

  /**
   * Removes a pay detail record from the database by its ID.
   * @param {number} payDetailId - The ID of the pay detail to be removed.
   * @returns {Promise<void | null>} - A promise that resolves when the operation completes.
   * @throws {Error} - Throws an error if the operation fails.
   */
  public removePayDetail = async (
    payDetailId: number
  ): Promise<void | null> => {
    try {
      const result = await this.payDetailModel.destroy({
        where: {
          id: {
            [Op.eq]: payDetailId,
          },
        },
      });

      if (result === 0) {
        throw new Error('Pay detail not found');
      }
    } catch (error) {
      console.error('Error removing pay detail:', error);
      throw error;
    }
  };
}
