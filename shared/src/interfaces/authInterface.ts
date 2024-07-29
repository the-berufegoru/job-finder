/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @fileoverview
 * @version
 * @module
 */

import { IAdmin } from './adminInterface';
import { ICandidate } from './candidateInterface';
import { IRecruiter } from './recruiterInterface';

interface IJwtConfig {
  accessToken: string;
  activationToken: string;
  passwordToken: string;
}

interface IAuthConfig {
  admin: IJwtConfig;
  candidate: IJwtConfig;
  recruiter: IJwtConfig;
}

interface IAuthorizationConfig {
  token: string;
  role: string;
}

interface IBaseRegister {
  email: string;
  phoneNumber: string;
  newPassword: string;
  confirmPassword: string;
}

type IAdminRegister = IAdmin & IBaseRegister;
type ICandidateRegister = ICandidate & IBaseRegister;
type IRecruiterRegister = IRecruiter & IBaseRegister;

export {
  IAuthConfig,
  IAuthorizationConfig,
  IAdminRegister,
  ICandidateRegister,
  IRecruiterRegister,
};
