/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @fileoverview
 * @module
 * @version
 */
import { toUserDTO, UserDTO } from '@job-finder/dtos';

interface CandidateDto {
  id: number;
  firstName: string;
  lastName: string;
  title:
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
  skills: string[];
  isEmployed: boolean;
  user: UserDTO;
}

const toCandidateDto = (candidate: any): CandidateDto => ({
  id: candidate['id'],
  firstName: candidate['firstName'],
  lastName: candidate['lastName'],
  title: candidate['title'],
  skills: candidate['skills'],
  isEmployed: candidate['isEmployed'],
  user: candidate['user'] ? toUserDTO(candidate['user']) : undefined,
});

export { CandidateDto, toCandidateDto };
