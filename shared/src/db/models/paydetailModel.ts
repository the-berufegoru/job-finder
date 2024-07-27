/**
 * @fileoverview PayDetail Model Definition
 * @version 1.0.0
 * @module payDetailModel
 */

import { sequelize } from '../../libs';
import { Model, DataTypes, Association } from 'sequelize';
import { IPayDetail } from '../../interfaces/payslipInterface';
import { Employee } from './employeeModel';

/**
 * PayDetail model class.
 * @class PayDetail
 * @extends {Model<IPayDetail>}
 */
class PayDetail extends Model<IPayDetail> implements IPayDetail {
  /**
   * PayDetail ID
   * @type {number}
   */
  public id!: number;

  /**
   * Employee ID
   * @type {number}
   */
  public employeeId!: number;

  /**
   * Basic Salary
   * @type {number}
   */
  public basicSalary!: number;

  /**
   * Bonuses
   * @type {number}
   */
  public bonuses!: number;

  /**
   * Overtime Pay
   * @type {number}
   */
  public overtimePay!: number;

  /**
   * Pay Period
   * @type {Date}
   */
  public payPeriod!: Date;

  /**
   * Employee association
   * @type {Association<PayDetail, Employee>}
   */
  public static associations: {
    employee: Association<PayDetail, Employee>;
  };
}

PayDetail.init(
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
    basicSalary: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    bonuses: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    overtimePay: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    payPeriod: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'PayDetail',
    tableName: 'pay_details',
    schema: 'payroll',
    timestamps: false,
  }
);

// Define associations
PayDetail.belongsTo(Employee, { foreignKey: 'employeeId', as: 'employee' });

export { PayDetail };
