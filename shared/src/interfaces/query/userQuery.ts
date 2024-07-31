/**
 * @fileoverview
 * @version
 * @module
 */

interface IUserQuery {
  id?: number;
  email?: string;
}

interface IUpdateContactQuery {
  email?: string;
  phoneNumber?: string;
}

interface IUpdatePasswordQuery {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export { IUserQuery, IUpdateContactQuery, IUpdatePasswordQuery };
