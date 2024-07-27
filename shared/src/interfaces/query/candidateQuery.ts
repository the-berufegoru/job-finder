/**
 * @fileoverview
 * @version
 * @module
 */

interface ICandidateQuery {
  id?: number;
  userId?: number;
}

interface ICandidatesQuery {
  skills?: string[];
  isEmployed?: boolean;
}

export { ICandidateQuery, ICandidatesQuery };
