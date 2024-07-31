/**
 * @fileoverview
 * @module
 * @version
 */
import Joi from 'joi';
import { IUpdatePasswordQuery } from '../interfaces/query/userQuery';

export const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required().messages({
    'string.base': 'Current Password should be a text string.',
    'string.empty': 'Please enter your current password.',
    'any.required': 'Current Password is required.',
  }),
  newPassword: Joi.string().required().messages({
    'string.base': 'New Password should be a text string.',
    'string.empty': 'Please enter a new password.',
    'any.required': 'New Password is required.',
  }),
  confirmPassword: Joi.string()
    .required()
    .valid(Joi.ref('newPassword'))
    .messages({
      'string.base': 'Confirm Password should be a text string.',
      'string.empty': 'Please confirm your new password.',
      'any.required': 'Confirm Password is required.',
      'any.only': 'Confirm Password must match the New Password.',
    }),
});

export const validatePasswordUpdate = (
  passwords: IUpdatePasswordQuery
): { error?: Joi.ValidationError } => {
  return updatePasswordSchema.validate(passwords, {
    abortEarly: false,
  });
};
