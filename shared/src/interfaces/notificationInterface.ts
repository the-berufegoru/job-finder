/**
 * @fileoverview
 * @version
 * @module
 */
import mailGen from 'mailgen';

interface IMailgenConfig {
  theme: string;
  product: {
    name: string;
    link: string;
    logo: string;
    copyright: string;
  };
}

interface INodemailerConfig {
  service: string;
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

// interface ISendgridConfig {
// apiKey: string;
// username: string;
// }

interface INotificationConfig {
  mailgen: IMailgenConfig;
  nodemailer: INodemailerConfig;
  // sendgrid: ISendgridConfig;
}

interface INotificationLib {
  getMailgenInstance(): mailGen;
}

export { INotificationConfig, INotificationLib };
