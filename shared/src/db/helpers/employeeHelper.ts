/**
 * @fileoverview Helper class for managing Employee operations
 * @version 1.0.0
 * @module employeeHelper
 */
import { Op } from 'sequelize';
import { IEmployee } from '../../interfaces/employeeInterface';
import { Employee } from '../models/employeeModel';

export default class EmployeeHelper {
  private readonly employeeModel: typeof Employee;

  constructor() {
    this.employeeModel = Employee;
  }

  /**
   * Creates a new employee
   * @param {IEmployee} employeeData - The employee data
   * @returns {Promise<void>}
   */
  public createEmployee = async (employeeData: IEmployee): Promise<void> => {
    try {
      await this.employeeModel.create(employeeData);
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error;
    }
  };

  /**
   * Retrieves an employee by ID
   * @param {number} employeeId - The employee ID
   * @returns {Promise<IEmployee | null>}
   */
  public getEmployeeById = async (
    employeeId: number
  ): Promise<IEmployee | null> => {
    try {
      const employee = await this.employeeModel.findByPk(employeeId);
      return employee;
    } catch (error) {
      console.error('Error retrieving employee:', error);
      throw error;
    }
  };

  /**
   * Retrieves employees by department
   * @param {string} department - The department name
   * @returns {Promise<IEmployee[]>}
   */
  public getEmployeesByDepartment = async (
    department: string
  ): Promise<IEmployee[]> => {
    try {
      const employees = await this.employeeModel.findAll({
        where: {
          department: {
            [Op.eq]: department,
          },
        },
      });
      return employees;
    } catch (error) {
      console.error('Error retrieving employees by department:', error);
      throw error;
    }
  };

  /**
   * Updates an employee by ID
   * @param {number} employeeId - The employee ID
   * @param {Partial<IEmployee>} employeeData - The employee data to update
   * @returns {Promise<void>}
   */
  public updateEmployee = async (
    employeeId: number,
    employeeData: Partial<IEmployee>
  ): Promise<void> => {
    try {
      await this.employeeModel.update(employeeData, {
        where: {
          id: {
            [Op.eq]: employeeId,
          },
        },
      });
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  };

  /**
   * Removes an employee by ID
   * @param {number} employeeId - The employee ID
   * @returns {Promise<void>}
   */
  public removeEmployee = async (employeeId: number): Promise<void> => {
    try {
      const result = await this.employeeModel.destroy({
        where: {
          id: {
            [Op.eq]: employeeId,
          },
        },
      });

      if (result === 0) {
        throw new Error('Employee not found');
      }
    } catch (error) {
      console.error('Error removing employee:', error);
      throw error;
    }
  };
}
