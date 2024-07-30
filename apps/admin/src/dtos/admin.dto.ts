/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @fileoverview
 * @module
 * @version
 */
import { toUserDTO, UserDTO } from '@job-finder/dtos';

interface AdminDTO {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  user: UserDTO;
}

const toAdminDTO = (admin: any): AdminDTO => ({
  id: admin.id,
  firstName: admin.firstName,
  lastName: admin.lastName,
  user: admin.user ? toUserDTO(admin.user) : undefined,
  createdAt: undefined,
  updatedAt: undefined,
});

export { AdminDTO, toAdminDTO };
