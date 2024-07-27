/**
 * @fileoverview
 * @module
 * @version
 */

export interface IPayDetail {
  id?: number;
  employeeId: number;
  basicSalary: number;
  bonuses?: number;
  overtimePay?: number;
  payPeriod: Date;
}

export interface IDeduction {
  id?: number;
  employeeId: number;
  tax: number;
  insurance?: number;
  retirementFund?: number;
  otherDeductions?: number;
  deductionPeriod: Date;
}

export interface IPayslip {
  id?: number;
  employeeId: number;
  payDetailId: number;
  deductionId: number;
  issueDate: Date;
  totalEarnings?: number;
  totalDeductions?: number;
  netPay?: number;
}
