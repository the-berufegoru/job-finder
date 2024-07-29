/**
 * @fileoverview Utility class for sending notifications via email.
 * @version 1.0.0
 * @module NotificationUtil
 */

import { NotificationLib } from '../libs';
import { notificationConfig } from '../configs';

/**
 * A utility class for handling email notifications.
 * @class NotificationUtil
 */
export default class NotificationUtil {
  private readonly notificationUtil: NotificationLib;

  /**
   * Creates an instance of NotificationUtil.
   */
  constructor() {
    this.notificationUtil = new NotificationLib();
  }

  /**
   * Sends an email using Nodemailer.
   * @param {string} receiver - The email address of the recipient.
   * @param {string} subject - The subject of the email.
   * @param {string} template - The HTML template for the email body.
   * @returns {Promise<void>} - A promise that resolves when the email is sent or rejects if an error occurs.
   */
  public sendEmail = async (
    receiver: string,
    subject: string,
    template: string
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      this.notificationUtil.createNodemailerTransport().sendMail(
        {
          from: `No-reply ${notificationConfig?.nodemailer?.auth?.user}`,
          to: receiver,
          subject,
          html: template,
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        (error, info) => {
          if (error) {
            reject(new Error(`Failed to send email: ${error.message}`));
          } else {
            resolve();
          }
        }
      );
    });
  };
}
