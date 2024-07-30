/**
 * @fileoverview
 * @module
 * @version
 */
import { sequelize } from '../../libs';
import { Admin } from './adminModel';
import { Candidate } from './candidateModel';
import { Recruiter } from './recruiterModel';
import { User } from './userModel';

const models = {
  Admin,
  Candidate,
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
