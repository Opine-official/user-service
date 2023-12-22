import nodemailer from "nodemailer";

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "hackerconnect630@gmail.com",
        pass: "djzrpibqugonybxx",
      },
    });
  }

  async sendVerificationEmail(
    to: string,
    verificationCode: string
  ): Promise<Error | void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: "hackerconnect630@gmail.com",
      to,
      subject: "Account Verification",
      text: `Your verification code is: ${verificationCode}`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Verification email sent successfully");
    } catch (error) {
      console.error("Error sending verification email:", error);
      return new Error("Failed to send verification email");
    }
  }
}