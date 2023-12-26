import { Resend } from 'resend';

type SEND_EMAIL = string;

class EmailSendError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EmailSendError';
  }
}

export class EmailService {
  private readonly sendEmail: SEND_EMAIL;

  constructor(sendEmail: SEND_EMAIL) {
    this.sendEmail = sendEmail;
  }

  public async send(
    to: string,
    emailVerificationCode: string,
  ): Promise<void | EmailSendError> {
    try {
      const resend = new Resend(process.env.RESEND_API);

      const data = await resend.emails.send({
        from: this.sendEmail,
        to,
        subject: 'Welcome Onboard!',
        html: `<strong>It works! ${emailVerificationCode}</strong>`,
      });

      console.log(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new EmailSendError(error.message);
      }
      return new EmailSendError('Something went wrong');
    }
  }
}
