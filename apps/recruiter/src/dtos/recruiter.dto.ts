/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @fileoverview
 * @module
 * @version
 */
import { toUserDTO, UserDTO } from '@job-finder/dtos';

interface RecruiterDto {
  id: number;
  name: string;
  industry: string;
  websiteUrl: string;
  location: string;
  description: string;
  size: number;
  foundedIn: number;
  isVerified: boolean;
  user: UserDTO;
}

const toRecruiterDto = (recruiter: any): RecruiterDto => ({
  id: recruiter['id'],
  name: recruiter['name'],
  industry: recruiter['industry'],
  websiteUrl: recruiter['websiteUrl'],
  location: recruiter['location'],
  description: recruiter['description'],
  size: recruiter['size'],
  foundedIn: recruiter['foundedIn'],
  isVerified: recruiter['isVeried'],
  user: recruiter['user'] ? toUserDTO(recruiter['user']) : undefined,
});

export { RecruiterDto, toRecruiterDto };
