/**
 * @fileoverview Defines routes for managing candidate-related HTTP requests.
 * @module CandidateRoutes
 * @version 1.0.0
 */
import { Router } from 'express';
import RecruiterController from '../controllers/recruiter.controller';
import { UserController } from '@job-finder/controllers';

/**
 * Class representing the routes for candidate management.
 */
export default class CandidateRoutes {
  private readonly recruiterRouter: Router;

  /**
   * Creates an instance of RecruiterRoutes.
   * @param {RecruiterController} [recruiterController] - The controller handling recruiter-related requests.
   * @param {UserController} [userController] - The controller handling user-related requests.
   */
  constructor(
    private readonly recruiterController: RecruiterController = new RecruiterController(),
    private readonly userController: UserController = new UserController(
      'recruiter'
    )
  ) {
    this.recruiterRouter = Router();
  }

  /**
   * Sets up the routes for recruiter management.
   * @private
   */
  private setupRoutes(): void {
    this.recruiterRouter.get('/', this.recruiterController.getProfile);
    this.recruiterRouter.patch('/', this.recruiterController.updateProfile);
    this.recruiterRouter.patch(
      '/contact',
      this.userController.updateContactDetails
    );
    this.recruiterRouter.patch('/password', this.userController.updatePassword);
    this.recruiterRouter.delete('/', this.userController.removeAccount);
  }

  /**
   * Initializes the recruiter routes.
   * @returns {Router} - The configured recruiter router.
   */
  public init(): Router {
    this.setupRoutes();
    return this.recruiterRouter;
  }
}
