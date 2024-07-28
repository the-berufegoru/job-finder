/**
 * @fileoverview This module provides functions for validating passwords.
 * @version 1.0.0
 * @module passwordValidator
 */
import crypto from 'crypto';

/**
 * Compares two strings to see if they are equal, ignoring leading and trailing spaces.
 *
 * @param {string} str1 The first string to compare.
 * @param {string} str2 The second string to compare.
 * @returns {boolean} `true` if the two strings are equal, `false` otherwise.
 */
export const compareStrings = (str1: string, str2: string): boolean => {
  const trimmedStr1 = str1.trim();
  const trimmedStr2 = str2.trim();

  const buffer1: Buffer = Buffer.from(trimmedStr1, 'utf8');
  const buffer2: Buffer = Buffer.from(trimmedStr2, 'utf8');

  return (
    buffer1.length === buffer2.length &&
    crypto.timingSafeEqual(buffer1, buffer2)
  );
};

/**
 * Validates if a string is a strong password.
 *
 * @param {string} password The password to validate.
 * @param {string} confirmPassword The confirmation password to validate.
 * @param {function(Error?, string?)} callback The callback function to call with the result of the validation.
 * @returns {undefined}
 */
export const isPassword = (
  password: string,
  confirmPassword: string,
  callback: (error: Error | null, result: string | null) => void
) => {
  if (typeof password !== 'string' || typeof confirmPassword !== 'string') {
    callback(new Error('Invalid input.'), null);
  }

  const passwordsMatch = compareStrings(password, confirmPassword);

  if (!passwordsMatch) {
    callback(new Error('The passwords entered do not match.'), null);
  } else if (!/[a-z]/.test(password)) {
    callback(
      new Error('Password must contain at least one lowercase letter.'),
      null
    );
  } else if (!/[A-Z]/.test(password)) {
    callback(
      new Error('Password must contain at least one uppercase letter.'),
      null
    );
  } else if (!/(\d)/.test(password)) {
    callback(new Error('Password must contain at least one digit.'), null);
  } else if (password.length < 8) {
    callback(new Error('Password must be at least 8 characters long.'), null);
  } else {
    callback(null, confirmPassword);
  }
};
