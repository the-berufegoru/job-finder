/**
 * @fileoverview
 * @version
 * @module
 */

export interface IRecruiterQuery {
  id?: number;
  userId?: number;
}

export interface IRecruitersQuery {
  name?: string;
  industry?: string;
  location?: string;
  isVerified?: boolean;
}
