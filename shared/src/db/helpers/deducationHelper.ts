/**
 * @fileoverview Helper class for managing Deduction operations
 * @version 1.0.0
 * @module deductionHelper
 */
import { Op } from 'sequelize';
import { IDeduction } from '../../interfaces/payslipInterface';
import { Deduction } from '../models/deductionModel';

export default class DeductionHelper {
  private readonly deductionModel: typeof Deduction;

  constructor() {
    this.deductionModel = Deduction;
  }

  /**
   * Creates a new deduction
   * @param {IDeduction} deductionData - The deduction data
   * @returns {Promise<void>}
   */
  public createDeduction = async (deductionData: IDeduction): Promise<void> => {
    try {
      await this.deductionModel.create(deductionData);
    } catch (error) {
      console.error('Error creating deduction:', error);
      throw error;
    }
  };

  /**
   * Retrieves a deduction by ID
   * @param {number} deductionId - The deduction ID
   * @returns {Promise<IDeduction | null>}
   */
  public getDeductionById = async (
    deductionId: number
  ): Promise<IDeduction | null> => {
    try {
      const deduction = await this.deductionModel.findByPk(deductionId);
      return deduction;
    } catch (error) {
      console.error('Error retrieving deduction:', error);
      throw error;
    }
  };

  /**
   * Retrieves deductions by Employee ID
   * @param {number} employeeId - The Employee ID
   * @returns {Promise<IDeduction[]>}
   */
  public getDeductionsByEmployeeId = async (
    employeeId: number
  ): Promise<IDeduction[]> => {
    try {
      const deductions = await this.deductionModel.findAll({
        where: {
          employeeId: {
            [Op.eq]: employeeId,
          },
        },
      });
      return deductions;
    } catch (error) {
      console.error('Error retrieving deductions by employee ID:', error);
      throw error;
    }
  };

  /**
   * Updates a deduction by ID
   * @param {number} deductionId - The deduction ID
   * @param {Partial<IDeduction>} deductionData - The deduction data to update
   * @returns {Promise<void>}
   */
  public updateDeduction = async (
    deductionId: number,
    deductionData: Partial<IDeduction>
  ): Promise<void> => {
    try {
      await this.deductionModel.update(deductionData, {
        where: {
          id: {
            [Op.eq]: deductionId,
          },
        },
      });
    } catch (error) {
      console.error('Error updating deduction:', error);
      throw error;
    }
  };

  /**
   * Removes a deduction by ID
   * @param {number} deductionId - The deduction ID
   * @returns {Promise<void>}
   */
  public removeDeduction = async (deductionId: number): Promise<void> => {
    try {
      const result = await this.deductionModel.destroy({
        where: {
          id: {
            [Op.eq]: deductionId,
          },
        },
      });

      if (result === 0) {
        throw new Error('Deduction not found');
      }
    } catch (error) {
      console.error('Error removing deduction:', error);
      throw error;
    }
  };
}
