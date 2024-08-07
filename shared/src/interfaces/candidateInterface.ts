/**
 * @fileoverview Defines the ICandidate interface for candidate data.
 * @version 1.0.0
 * @module candidateInterface
 */

import { Optional } from 'sequelize';

/**
 * Interface representing the attributes of a candidate.
 */
export interface ICandidate {
  id?: number;
  firstName: string;
  lastName: string;
  title?:
    | 'Mr'
    | 'Mrs'
    | 'Ms'
    | 'Miss'
    | 'Dr'
    | 'Prof'
    | 'Rev'
    | 'Capt'
    | 'Sir'
    | 'Madam'
    | 'Mx'
    | 'Rather Not Say';
  skills?: string[];
  isEmployed?: boolean;
  userId?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Interface for creating a new candidate (excluding autogenerated fields).
 */
export type ICandidateCreation = Optional<
  ICandidate,
  'id' | 'createdAt' | 'updatedAt'
>;
