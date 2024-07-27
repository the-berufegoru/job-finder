/**
 * @fileoverview Payslip Model Definition
 * @version 1.0.0
 * @module payslipModel
 */
import { Association, DataTypes, Model } from 'sequelize';
import { sequelize } from '../../libs';
import { IPayslip } from '../../interfaces/payslipInterface';
import { Deduction } from './deductionModel';
import { Employee } from './employeeModel';
import { PayDetail } from './paydetailModel';

/**
 * Payslip model class.
 * @class Payslip
 * @extends {Model<IPayslip>}
 */
class Payslip extends Model<IPayslip> implements IPayslip {
  /**
   * Payslip ID
   * @type {number}
   */
  public id!: number;

  /**
   * Employee ID
   * @type {number}
   */
  public employeeId!: number;

  /**
   * Pay Detail ID
   * @type {number}
   */
  public payDetailId!: number;

  /**
   * Deduction ID
   * @type {number}
   */
  public deductionId!: number;

  /**
   * Issue Date
   * @type {Date}
   */
  public issueDate!: Date;

  /**
   * Total Earnings
   * @type {number}
   */
  public totalEarnings!: number;

  /**
   * Total Deductions
   * @type {number}
   */
  public totalDeductions!: number;

  /**
   * Net Pay
   * @type {number}
   */
  public netPay!: number;

  /**
   * Associations for the Payslip model
   * @type {{
   *   employee: Association<Payslip, Employee>;
   *   payDetail: Association<Payslip, PayDetail>;
   *   deduction: Association<Payslip, Deduction>;
   * }}
   */
  public static associations: {
    employee: Association<Payslip, Employee>;
    payDetail: Association<Payslip, PayDetail>;
    deduction: Association<Payslip, Deduction>;
  };
}

Payslip.init(
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
    payDetailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PayDetail,
        key: 'id',
      },
    },
    deductionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Deduction,
        key: 'id',
      },
    },
    issueDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    totalEarnings: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    totalDeductions: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    netPay: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Payslip',
    tableName: 'payslips',
    schema: 'payroll',
    timestamps: false,
    hooks: {
      beforeCreate: async (payslip) => {
        const payDetail = await PayDetail.findByPk(payslip.payDetailId);
        const deduction = await Deduction.findByPk(payslip.deductionId);

        if (payDetail && deduction) {
          payslip.totalEarnings =
            parseFloat(payDetail.basicSalary.toString()) +
            parseFloat((payDetail.bonuses || 0).toString()) +
            parseFloat((payDetail.overtimePay || 0).toString());

          payslip.totalDeductions =
            parseFloat(deduction.tax.toString()) +
            parseFloat((deduction.insurance || 0).toString()) +
            parseFloat((deduction.retirementFund || 0).toString()) +
            parseFloat((deduction.otherDeductions || 0).toString());

          payslip.netPay = payslip.totalEarnings - payslip.totalDeductions;
        }
      },
    },
  }
);

// Define associations with explicit aliases
Payslip.belongsTo(Employee, { foreignKey: 'employeeId', as: 'employee' });
Payslip.belongsTo(PayDetail, { foreignKey: 'payDetailId', as: 'payDetail' });
Payslip.belongsTo(Deduction, { foreignKey: 'deductionId', as: 'deduction' });

export { Payslip };
