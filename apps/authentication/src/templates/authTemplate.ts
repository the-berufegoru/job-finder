/**
 * @fileoverview Utility class for generating authentication email templates.
 * @version 1.0.0
 * @module AuthenticationTemplate
 */

import { notificationConfig } from '@job-finder/configs';
import { NotificationLib } from '@job-finder/libs';

const {
  NX_AUTHENTICATION_API,
  NX_ADMIN_URL,
  NX_RECRUITER_URL,
  NX_CANDIDATE_URL,
} = process.env;

/**
 * A class for generating email templates related to user authentication, such as account activation,
 * password reset, and password updates.
 * @class AuthenticationTemplate
 */
export default class AuthenticationTemplate {
  private readonly notificationUtil: NotificationLib;

  /**
   * Creates an instance of AuthenticationTemplate.
   */
  constructor() {
    this.notificationUtil = new NotificationLib();
  }

  /**
   * Generates the activation URL for account activation.
   *
   * @param {string} activationToken - The activation token associated with the account.
   * @returns {string} - The generated activation URL.
   * @private
   */
  private generateActivationUrl = (activationToken: string): string => {
    return `${NX_AUTHENTICATION_API}/api/v1/auth/account/confirm_activation?token=${encodeURIComponent(
      activationToken
    )}`;
  };

  /**
   * Generates the password reset URL based on user role and token.
   *
   * @param {string} role - The user role (e.g., 'admin', 'candidate', 'recruiter').
   * @param {string} passwordToken - The password reset token.
   * @returns {string} - The generated password reset URL.
   * @private
   */
  private generatePasswordResetUrl = (
    role: string,
    passwordToken: string
  ): string => {
    const url =
      role === 'admin'
        ? NX_ADMIN_URL
        : role === 'candidate'
        ? NX_CANDIDATE_URL
        : role === 'recruiter'
        ? NX_RECRUITER_URL
        : NX_CANDIDATE_URL;

    return `${url}/auth/password/edit?password_token=${encodeURIComponent(
      passwordToken
    )}`;
  };

  /**
   * Generates an account activation email template.
   *
   * @param {string} email - The user's email address.
   * @param {string} activationToken - The account activation token.
   * @returns {string} - The generated email content.
   */
  public activateAccount = (email: string, activationToken: string): string => {
    const activationUrl = this.generateActivationUrl(activationToken);

    return this.notificationUtil.getMailgenInstance('salted').generate({
      body: {
        title: `Activate your ${notificationConfig?.mailgen?.product?.name} account`,
        intro: `You just signed up for a new ${notificationConfig?.mailgen?.product?.name} account with the username: ${email}.`,
        action: {
          instructions:
            'To finish creating your account, click on the link below within the next 15 minutes.',
          button: {
            text: 'Activate Account',
            color: '#28214c',
            link: activationUrl,
          },
        },
        outro: `Having troubles? Copy this link into your browser instead: ${activationUrl}`,
      },
    });
  };

  /**
   * Generates a reactivation email template for an inactive account.
   *
   * @param {string} email - The user's email address.
   * @param {string} activationToken - The account activation token.
   * @returns {string} - The generated email content.
   */
  public reactivateAccount = (
    email: string,
    activationToken: string
  ): string => {
    const reactivationUrl = this.generateActivationUrl(activationToken);

    return this.notificationUtil.getMailgenInstance('salted').generate({
      body: {
        title: `Reactivate your ${notificationConfig?.mailgen?.product?.name} account`,
        intro: `We noticed your ${notificationConfig?.mailgen?.product?.name} account for username ${email} is currently inactive.`,
        action: {
          instructions:
            'To reactivate your account, click on the button below within the next 15 minutes.',
          button: {
            text: 'Reactivate Account',
            color: '#28214c',
            link: reactivationUrl,
          },
        },
        outro: `Having troubles? Copy this link into your browser instead: ${reactivationUrl}`,
      },
    });
  };

  /**
   * Generates a password reset email template.
   *
   * @param {string} email - The user's email address.
   * @param {string} token - The password reset token.
   * @param {string} role - The user role (e.g., 'admin', 'candidate', 'recruiter').
   * @returns {string} - The generated password reset email content.
   */
  public forgotPassword = (
    email: string,
    token: string,
    role: string
  ): string => {
    const resetUrl = this.generatePasswordResetUrl(role, token);

    return this.notificationUtil.getMailgenInstance('salted').generate({
      body: {
        title: `Hello, ${email}.`,
        intro: 'Someone has requested a link to change your password.',
        action: {
          instructions:
            'To reset your password, click the button below within the next 30 minutes. If you ignore this message, your password will not be changed.',
          button: {
            text: 'Reset Password',
            color: '#28214c',
            link: resetUrl,
          },
        },
        outro: `Having troubles? Copy this link into your browser instead: ${resetUrl}`,
      },
    });
  };

  /**
   * Generates a password update email template.
   *
   * @param {string} email - The user's email address.
   * @param {object} device - Information about the device used for the password update.
   * @param {string} device.ip - The IP address of the device.
   * @param {string} device.timestamp - The timestamp of the password update.
   * @returns {string} - The generated email content.
   */
  public passwordUpdate = (
    email: string,
    device: {
      ip: string;
      timestamp: string;
    }
  ): string => {
    return this.notificationUtil.getMailgenInstance('salted').generate({
      body: {
        title: `Hi, ${email}.`,
        intro: `Your ${notificationConfig?.mailgen?.product?.name} account password has been successfully updated.`,
        table: {
          data: [
            { item: 'IP', description: device.ip },
            { item: 'Timestamp', description: device.timestamp },
          ],
          columns: {
            customWidth: {
              item: '20%',
              description: '80%',
            },
            customAlignment: {
              item: 'left',
              description: 'left',
            },
          },
        },
        outro: `If you did not make this change or need further assistance, please contact our support team at support@${notificationConfig?.mailgen?.product?.link}.`,
      },
    });
  };
}
