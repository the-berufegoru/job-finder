/**
 * @fileoverview
 * @module
 * @version
 */

export interface IEmployee {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  hireDate: Date;
  jobTitle: string;
  department: string;
}
