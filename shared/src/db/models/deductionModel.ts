/**
 * @fileoverview Deduction Model Definition
 * @version 1.0.0
 * @module deductionModel
 */
import { Association, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../libs';
import { IDeduction } from '../../interfaces/payslipInterface';
import { Employee } from './employeeModel';

/**
 * Deduction model class.
 * @class Deduction
 * @extends {Model<IDeduction>}
 */
class Deduction extends Model<IDeduction> implements IDeduction {
  /**
   * Deduction ID
   * @type {number}
   */
  public id!: number;

  /**
   * Employee ID
   * @type {number}
   */
  public employeeId!: number;

  /**
   * Tax amount
   * @type {number}
   */
  public tax!: number;

  /**
   * Insurance amount
   * @type {number}
   */
  public insurance!: number;

  /**
   * Retirement fund amount
   * @type {number}
   */
  public retirementFund!: number;

  /**
   * Other deductions amount
   * @type {number}
   */
  public otherDeductions!: number;

  /**
   * Deduction period
   * @type {Date}
   */
  public deductionPeriod!: Date;

  /**
   * Associations
   * @type {Association<Deduction, Employee>}
   */
  public static associations: {
    employee: Association<Deduction, Employee>;
  };
}

Deduction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Employee,
        key: 'id',
      },
    },
    tax: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    insurance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    retirementFund: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    otherDeductions: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    deductionPeriod: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Deduction',
    tableName: 'deductions',
    schema: 'payroll',
    timestamps: false,
  }
);

// Define associations
Deduction.belongsTo(Employee, { foreignKey: 'employeeId', as: 'employee' });

export { Deduction };
