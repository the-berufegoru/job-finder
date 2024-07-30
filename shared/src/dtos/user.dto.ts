/**
 * @fileoverview
 * @module
 * @version
 */

import { IUser } from '../interfaces';

interface UserDTO {
  id: number;
  avatarUrl?: object | null;
  email: string;
  mobileNumber: string;
  role: 'admin' | 'candidate' | 'recruiter';
  isVerified: boolean;
}

const toUserDTO = (user: IUser): UserDTO => ({
  id: user.id,
  avatarUrl: user.avatarUrl,
  email: user.email,
  mobileNumber: user.mobileNumber,
  role: user.role,
  isVerified: user.isVerified,
});

export { UserDTO, toUserDTO };
