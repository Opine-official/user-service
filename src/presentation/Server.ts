import express from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { LoginUserController } from './controllers/LoginUserController';
import { VerifyUserEmailController } from './controllers/VerifyUserController';
import { ResetPasswordController } from './controllers/ResetPasswordController';
import { VerifyPasswordResetCodeController } from './controllers/VerifyPasswordResetCodeController';
import { InitiatePasswordResetController } from './controllers/InitiatePasswordResetController';
import { LogoutUserController } from './controllers/LogoutUserController';
import { ResendOTPController } from './controllers/ResendOTPController';

interface ServerControllers {
  createUserController: CreateUserController;
  loginUserController: LoginUserController;
  resendOTPController: ResendOTPController;
  verifyUserEmailController: VerifyUserEmailController;
  initiatePasswordResetController: InitiatePasswordResetController;
  verifyPasswordResetCodeController: VerifyPasswordResetCodeController;
  resetPasswordController: ResetPasswordController;
  logoutUserController: LogoutUserController;
}
export class Server {
  public static async run(
    port: number,
    controllers: ServerControllers,
  ): Promise<void> {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (req, res) => res.send('Server is running'));

    app.post('/register', (req, res) =>
      controllers.createUserController.handle(req, res),
    );

    app.post('/login', (req, res) =>
      controllers.loginUserController.handle(req, res),
    );

    app.post('/verifyEmail', (req, res) => {
      controllers.verifyUserEmailController.handle(req, res);
    });

    app.post('/resendOTP', (req, res) => {
      controllers.resendOTPController.handle(req, res);
    });

    app.post('/initiatePasswordReset', (req, res) => {
      controllers.initiatePasswordResetController.handle(req, res);
    });

    app.post('/verifyPasswordResetCode', (req, res) => {
      controllers.verifyPasswordResetCodeController.handle(req, res);
    });

    app.post('/resetPassword', (req, res) => {
      controllers.resetPasswordController.handle(req, res);
    });

    app.post('/logout', (req, res) => {
      controllers.logoutUserController.handle(req, res);
    });

    app.listen(port, () => {
      console.log(`Server is running in ${port}`);
    });
  }
}
