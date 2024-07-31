/**
 * @fileoverview Provides functionality to generate a password update email template.
 * @module PasswordTemplate
 * @version 1.0.0
 */

import { notificationConfig } from '../configs';
import { NotificationLib } from '../libs';

export default class PasswordTemplate {
  private readonly notificationUtil: NotificationLib;

  /**
   * Creates an instance of PasswordTemplate.
   * @param {NotificationLib} notificationUtil - The notification utility library.
   */
  constructor(notificationUtil: NotificationLib = new NotificationLib()) {
    this.notificationUtil = notificationUtil;
  }

  /**
   * Generates an email template for password update notifications.
   * @param {string} email - The email address of the recipient.
   * @param {Readonly<{ ip: string; timestamp: string; }>} device - The device information including IP address and timestamp.
   * @returns {string} The generated email template.
   */
  public passwordUpdate = (
    email: string,
    device: Readonly<{ ip: string; timestamp: string }>
  ): string => {
    const mailgenInstance = this.notificationUtil.getMailgenInstance('salted');
    return mailgenInstance.generate({
      body: {
        title: `Hi, ${email}.`,
        intro: `Your ${
          notificationConfig?.mailgen?.product?.name ?? 'Account'
        } password has been successfully updated.`,
        table: {
          data: [
            { item: 'IP', description: device.ip },
            { item: 'TIMESTAMP', description: device.timestamp },
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
        outro: `If you did not make this change or need further assistance, please contact our support team at support@${
          notificationConfig?.mailgen?.product?.link ?? 'yourdomain.com'
        }.`,
      },
    });
  };
}
