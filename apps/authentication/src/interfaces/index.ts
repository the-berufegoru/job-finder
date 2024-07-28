/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @fileoverview
 * @version
 * @module
 */

import { IAdmin, ICandidate, IRecruiter } from '@job-finder/interfaces';

interface IBaseRegister {
  email: string;
  phoneNumber: string;
  newPassword: string;
  confirmPassword: string;
}

type IAdminRegister = IAdmin & IBaseRegister;
type ICandidateRegister = ICandidate & IBaseRegister;
type IRecruiterRegister = IRecruiter & IBaseRegister;

export { IAdminRegister, ICandidateRegister, IRecruiterRegister };
