/**
 * @fileoverview Configuration for authentication and authorization tokens.
 * @version 1.0.0
 * @module authConfig
 */
import { IAuthConfig, IRoleAuthConfig } from '../interfaces';

const getRoleAuthConfig = (role: string): IRoleAuthConfig => ({
  jwt: {
    accessToken: process.env[`${role}_ACCESS_KEY`] || '',
    activationToken: process.env[`${role}_ACTIVATION_KEY`] || '',
    passwordToken: process.env[`${role}_PASSWORD_KEY`] || '',
  },
  argon: {
    pepper: process.env[`${role}_PEPPER`] || '',
  },
});

export const authConfig: IAuthConfig = {
  admin: getRoleAuthConfig('ADMIN'),
  candidate: getRoleAuthConfig('CANDIDATE'),
  recruiter: getRoleAuthConfig('RECRUITER'),
};

// log missing variables
const validateAuthConfig = () => {
  Object.entries(authConfig).forEach(([role, config]) => {
    Object.entries(config.jwt).forEach(([key, value]) => {
      if (!value) {
        console.warn(
          `Warning: Missing environment variable for ${role} ${key}`
        );
      }
    });
    if (!config.argon.pepper) {
      console.warn(`Warning: Missing environment variable for ${role} pepper`);
    }
  });
};

validateAuthConfig();
