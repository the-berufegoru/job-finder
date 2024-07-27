/**
 * @fileoverview Helper class for managing Payslip operations.
 * @version 1.0.0
 * @module payslipHelper
 */

import { Op } from 'sequelize';
import { IPayslip } from '../../interfaces/payslipInterface';
import { Payslip } from '../models/payslipModel';
import { Employee, PayDetail, Deduction } from '../models';

/**
 * Helper class for managing operations related to the Payslip model.
 * @class PayslipHelper
 */
export default class PayslipHelper {
  private readonly payslipModel: typeof Payslip;

  /**
   * Constructs a new PayslipHelper instance.
   */
  constructor() {
    this.payslipModel = Payslip;
  }

  /**
   * Creates a new payslip record.
   * @param {IPayslip} payslipData - The data for the new payslip.
   * @returns {Promise<void>} - A promise that resolves when the payslip is created.
   * @throws {Error} - Throws an error if the creation fails.
   */
  public createPayslip = async (
    payslipData: IPayslip
  ): Promise<void | null> => {
    try {
      await this.payslipModel.create(payslipData);
    } catch (error) {
      console.error('Error creating payslip:', error);
      throw error;
    }
  };

  /**
   * Retrieves a payslip by its ID, including associated models.
   * @param {number} payslipId - The ID of the payslip to retrieve.
   * @returns {Promise<IPayslip | null>} - A promise that resolves with the payslip if found, or null if not found.
   * @throws {Error} - Throws an error if the retrieval fails.
   */
  public getPayslip = async (payslipId: number): Promise<IPayslip | null> => {
    try {
      const payslip = await this.payslipModel.findOne({
        where: {
          id: {
            [Op.eq]: payslipId,
          },
        },
        include: [
          { model: Employee, as: 'employee' },
          { model: PayDetail, as: 'payDetail' },
          { model: Deduction, as: 'deduction' },
        ],
      });

      return payslip;
    } catch (error) {
      console.error('Error retrieving payslip:', error);
      throw error;
    }
  };

  /**
   * Updates an existing payslip based on its ID.
   * @param {number} payslipId - The ID of the payslip to update.
   * @param {Partial<IPayslip>} payslipData - The data to update in the payslip.
   * @returns {Promise<void>} - A promise that resolves when the payslip is updated.
   * @throws {Error} - Throws an error if the update fails.
   */
  public updatePayslip = async (
    payslipId: number,
    payslipData: Partial<IPayslip>
  ): Promise<void | null> => {
    try {
      const updateCondition = { ...payslipData };

      await this.payslipModel.update(updateCondition, {
        where: {
          id: {
            [Op.eq]: payslipId,
          },
        },
      });
    } catch (error) {
      console.error('Error updating payslip:', error);
      throw error;
    }
  };

  /**
   * Deletes a payslip by its ID.
   * @param {number} payslipId - The ID of the payslip to delete.
   * @returns {Promise<void>} - A promise that resolves when the payslip is deleted.
   * @throws {Error} - Throws an error if the deletion fails or if the payslip is not found.
   */
  public removePayslip = async (payslipId: number): Promise<void | null> => {
    try {
      const result = await this.payslipModel.destroy({
        where: {
          id: {
            [Op.eq]: payslipId,
          },
        },
      });

      if (result === 0) {
        throw new Error('Payslip not found');
      }
    } catch (error) {
      console.error('Error removing payslip:', error);
      throw error;
    }
  };
}
