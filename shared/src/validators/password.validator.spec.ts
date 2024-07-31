/**
 * @fileoverview
 * @module
 * @version
 */
import { validatePasswordUpdate } from './password.validator';
import { IUpdatePasswordQuery } from '../interfaces/query/userQuery';

describe('validatePasswordUpdate', () => {
  it('should pass validation for a valid password update', () => {
    const validQuery: IUpdatePasswordQuery = {
      currentPassword: 'oldPassword123',
      newPassword: 'newPassword123',
      confirmPassword: 'newPassword123',
    };
    const { error } = validatePasswordUpdate(validQuery);
    expect(error).toBeUndefined();
  });

  it('should fail validation when currentPassword is missing', () => {
    const invalidQuery: IUpdatePasswordQuery = {
      newPassword: 'newPassword123',
      confirmPassword: 'newPassword123',
    };
    const { error } = validatePasswordUpdate(invalidQuery);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Current Password is required.');
  });

  it('should fail validation when newPassword is missing', () => {
    const invalidQuery: IUpdatePasswordQuery = {
      currentPassword: 'oldPassword123',
      confirmPassword: 'newPassword123',
    };
    const { error } = validatePasswordUpdate(invalidQuery);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('New Password is required.');
  });

  it('should fail validation when confirmPassword is missing', () => {
    const invalidQuery: IUpdatePasswordQuery = {
      currentPassword: 'oldPassword123',
      newPassword: 'newPassword123',
    };
    const { error } = validatePasswordUpdate(invalidQuery);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Confirm Password is required.');
  });

  it('should fail validation when confirmPassword does not match newPassword', () => {
    const invalidQuery: IUpdatePasswordQuery = {
      currentPassword: 'oldPassword123',
      newPassword: 'newPassword123',
      confirmPassword: 'differentPassword123',
    };
    const { error } = validatePasswordUpdate(invalidQuery);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe(
      'Confirm Password must match the New Password.'
    );
  });

  it('should fail validation when currentPassword is an empty string', () => {
    const invalidQuery: IUpdatePasswordQuery = {
      currentPassword: '',
      newPassword: 'newPassword123',
      confirmPassword: 'newPassword123',
    };
    const { error } = validatePasswordUpdate(invalidQuery);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe(
      'Please enter your current password.'
    );
  });

  it('should fail validation when newPassword is an empty string', () => {
    const invalidQuery: IUpdatePasswordQuery = {
      currentPassword: 'oldPassword123',
      newPassword: '',
      confirmPassword: '',
    };
    const { error } = validatePasswordUpdate(invalidQuery);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe('Please enter a new password.');
  });

  it('should fail validation when confirmPassword is an empty string', () => {
    const invalidQuery: IUpdatePasswordQuery = {
      currentPassword: 'oldPassword123',
      newPassword: 'newPassword123',
      confirmPassword: '',
    };
    const { error } = validatePasswordUpdate(invalidQuery);
    expect(error).toBeDefined();
    expect(error?.details[0].message).toBe(
      'Confirm Password must match the New Password.'
    );
  });
});
