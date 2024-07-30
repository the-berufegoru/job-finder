/**
 * @fileoverview
 * @version 1.0.0
 * @module interfaces
 */

export { IAdmin, IAdminCreation } from './adminInterface';

export {
  IAuthConfig,
  IAuthorizationConfig,
  IAdminRegister,
  ICandidateRegister,
  IRecruiterRegister,
} from './authInterface';

export { ICandidate, ICandidateCreation } from './candidateInterface';

export { IDatabaseConfig } from './dbInterface';

export { IErrorSource, IErrorDetails } from './erroInterface';

export { IJwtToken } from './jwtInterface';

export { ILoggerConfig } from './loggerInterface';

export { INotificationConfig, INotificationLib } from './notificationInterface';

export { IRecruiter, IRecruiterCreation } from './recruiterInterface';

export { IUser, IUserCreation } from './userInterface';
