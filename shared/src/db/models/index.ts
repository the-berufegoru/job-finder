import { sequelize } from '../../libs';
import { Admin } from './adminModel';
import { Application } from './applicationModel';
import { Candidate } from './candidateModel';
import { Deduction } from './deductionModel';
import { Employee } from './employeeModel';
import { Job } from './jobModel';
import { PayDetail } from './paydetailModel';
import { Payslip } from './payslipModel';
import { Recruiter } from './recruiterModel';
import { User } from './userModel';

const models = {
  Admin,
  Application,
  Candidate,
  Deduction,
  Employee,
  Job,
  PayDetail,
  Payslip,
  Recruiter,
  User,
};

const associateModels = () => {
  Object.values(models).forEach((model) => {
    if (model.associate) {
      model.associate(models);
    }
  });
};

export { models, associateModels, sequelize };
