/**
 * @fileoverview Employee Model Definition
 * @version 1.0.0
 * @module employeeModel
 */
import { Association, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../libs';
import { IEmployee } from '../../interfaces/employeeInterface';
import { Deduction } from './deductionModel';
import { PayDetail } from './paydetailModel';
import { Payslip } from './payslipModel';

/**
 * Employee model class.
 * @class Employee
 * @extends {Model<IEmployee>}
 */
class Employee extends Model<IEmployee> implements IEmployee {
  /**
   * Employee ID
   * @type {number}
   */
  public id!: number;

  /**
   * First name of the employee
   * @type {string}
   */
  public firstName!: string;

  /**
   * Last name of the employee
   * @type {string}
   */
  public lastName!: string;

  /**
   * Email of the employee
   * @type {string}
   */
  public email!: string;

  /**
   * Phone number of the employee
   * @type {string}
   */
  public phoneNumber!: string;

  /**
   * Hire date of the employee
   * @type {Date}
   */
  public hireDate!: Date;

  /**
   * Job title of the employee
   * @type {string}
   */
  public jobTitle!: string;

  /**
   * Department of the employee
   * @type {string}
   */
  public department!: string;

  /**
   * Associations
   * @type {Association<Employee, PayDetail>}
   * @type {Association<Employee, Deduction>}
   * @type {Association<Employee, Payslip>}
   */
  public static associations: {
    payDetails: Association<Employee, PayDetail>;
    deductions: Association<Employee, Deduction>;
    payslips: Association<Employee, Payslip>;
  };

  public static associate() {
    Employee.hasMany(PayDetail, { foreignKey: 'employeeId', as: 'payDetails' });
    Employee.hasMany(Deduction, { foreignKey: 'employeeId', as: 'deductions' });
    Employee.hasMany(Payslip, { foreignKey: 'employeeId', as: 'payslips' });
  }
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    hireDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    jobTitle: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Employee',
    tableName: 'employees',
    schema: 'payroll',
    timestamps: false,
  }
);

export { Employee };
