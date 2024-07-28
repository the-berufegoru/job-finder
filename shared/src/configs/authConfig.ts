/**
 * @overview
 * @version
 * @module
 */
import { IAuthConfig } from '../interfaces';

const {
  ADMIN_ACCESS_KEY,
  ADMIN_ACTIVATION_KEY,
  ADMIN_PASSWORD_KEY,
  CANDIDATE_ACCESS_KEY,
  CANDIDATE_ACTIVATION_KEY,
  CANDIDATE_PASSWORD_KEY,
  RECRUITER_ACCESS_KEY,
  RECRUITER_ACTIVATION_KEY,
  RECRUITER_PASSWORD_KEY,
} = process.env;

export const authConfig: IAuthConfig = {
  admin: {
    accessToken: ADMIN_ACCESS_KEY || 'default_admin_access_key',
    activationToken: ADMIN_ACTIVATION_KEY || 'default_admin_activation_key',
    passwordToken: ADMIN_PASSWORD_KEY || 'default_admin_password_key',
  },
  candidate: {
    accessToken: CANDIDATE_ACCESS_KEY || 'default_candidate_access_key',
    activationToken:
      CANDIDATE_ACTIVATION_KEY || 'default_candidate_activation_key',
    passwordToken: CANDIDATE_PASSWORD_KEY || 'default_candidate_password_key',
  },
  recruiter: {
    accessToken: RECRUITER_ACCESS_KEY || 'default_recruiter_access_key',
    activationToken:
      RECRUITER_ACTIVATION_KEY || 'default_recruiter_activation_key',
    passwordToken: RECRUITER_PASSWORD_KEY || 'default_recruiter_password_key',
  },
};
