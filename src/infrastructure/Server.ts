import express from 'express';
import { CreateUserController } from '../presentation/controllers/CreateUserController';
import { LoginUserController } from '../presentation/controllers/LoginUserController';
import { VerifyUserEmailController } from '../presentation/controllers/VerifyUserEmailController';
import { ResetPasswordController } from '../presentation/controllers/ResetPasswordController';
import { VerifyPasswordResetCodeController } from '../presentation/controllers/VerifyPasswordResetCodeController';
import { InitiatePasswordResetController } from '../presentation/controllers/InitiatePasswordResetController';
import { LogoutUserController } from '../presentation/controllers/LogoutUserController';
import { ResendOTPController } from '../presentation/controllers/ResendOTPController';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { authenticateToken } from '@opine-official/authentication';
import { GetUserDetailsController } from '../presentation/controllers/GetUserDetailsController';
import { UpdateUserController } from '../presentation/controllers/UpdateUserController';

interface ServerControllers {
  createUserController: CreateUserController;
  updateUserController: UpdateUserController;
  loginUserController: LoginUserController;
  resendOTPController: ResendOTPController;
  verifyUserEmailController: VerifyUserEmailController;
  initiatePasswordResetController: InitiatePasswordResetController;
  verifyPasswordResetCodeController: VerifyPasswordResetCodeController;
  resetPasswordController: ResetPasswordController;
  getUserDetailsController: GetUserDetailsController;
  logoutUserController: LogoutUserController;
}

const corsOptions = {
  origin: 'https://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};
export class Server {
  public static async run(
    port: number,
    controllers: ServerControllers,
  ): Promise<void> {
    const app = express();
    app.use(cors(corsOptions));
    app.options('*', cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    app.get('/', (req, res) => res.send('Server is running'));

    app.post('/register', (req, res) =>
      controllers.createUserController.handle(req, res),
    );

    app.post('/update', authenticateToken, (req, res) =>
      controllers.updateUserController.handle(req, res),
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

    app.get('/details', authenticateToken, (req, res) => {
      controllers.getUserDetailsController.handle(req, res);
    });

    app.post('/logout', (req, res) => {
      controllers.logoutUserController.handle(req, res);
    });

    app.listen(port, () => {
      console.log(`Server is running in ${port}`);
    });
  }
}
