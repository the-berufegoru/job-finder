/**
 * @fileoverview Utility class for password hashing and validation using Argon2.
 * @module PasswordUtil
 * @version 1.0.0
 */
import * as argon2 from 'argon2';
import { authConfig } from '../configs';

type UserRole = 'admin' | 'candidate' | 'recruiter';

class PasswordUtil {
  private static instance: PasswordUtil;

  // Private constructor to prevent instantiation
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  // Static method to get the single instance of PasswordUtil
  public static getInstance(): PasswordUtil {
    if (!PasswordUtil.instance) {
      PasswordUtil.instance = new PasswordUtil();
    }
    return PasswordUtil.instance;
  }

  // Hash the password with the appropriate secret (pepper) based on role
  public async hashPassword(password: string, role: UserRole): Promise<string> {
    try {
      const secret = Buffer.from(authConfig[role].argon.pepper);
      if (!secret) {
        throw new Error(`Missing secret (pepper) for role: ${role}`);
      }

      return await argon2.hash(password, { secret });
    } catch (error) {
      throw new Error(
        `Password hashing failed for role ${role}: ${error.message || error}`
      );
    }
  }

  // Verify the hashed password with the plain password using the secret (pepper)
  public async compareSync(
    plainPassword: string,
    hashedPassword: string,
    role: UserRole
  ): Promise<boolean> {
    try {
      const secret = Buffer.from(authConfig[role].argon.pepper);
      if (!secret) {
        throw new Error(`Missing secret (pepper) for role: ${role}`);
      }
      return await argon2.verify(hashedPassword, plainPassword, { secret });
    } catch (error) {
      throw new Error(
        `Password validation failed for role ${role}: ${error.message || error}`
      );
    }
  }
}

export const passwordUtil = PasswordUtil.getInstance();
