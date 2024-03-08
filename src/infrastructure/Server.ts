import express from 'express';
import multer from 'multer';
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
import {
  authenticateToken,
  authenticateAdmin,
} from '@opine-official/authentication';
import { GetUserDetailsController } from '../presentation/controllers/GetUserDetailsController';
import { UpdateUserController } from '../presentation/controllers/UpdateUserController';
import { GetUserByUsernameController } from '../presentation/controllers/GetUserByUsernameController';
import mongoSanitize from 'express-mongo-sanitize';
import { SaveUserReportController } from '../presentation/controllers/SaveUserReportController';
import { GetReportedUsersController } from '../presentation/controllers/GetReportedUsersController';
import { GetRegistrationAnalyticsController } from '../presentation/controllers/GetRegistrationAnalyticsController';
import { BanUserController } from '../presentation/controllers/BanUserController';

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
  getUserByUsernameController: GetUserByUsernameController;
  logoutUserController: LogoutUserController;
  saveUserReportController: SaveUserReportController;
  getReportedUsersController: GetReportedUsersController;
  getRegistrationAnalyticsController: GetRegistrationAnalyticsController;
  banUserController: BanUserController;
}

const allowedOrigins = [
  'https://localhost:3000',
  'https://www.opine.ink',
  'https://opine.ink',
];

const corsOptions = {
  origin: 'https://www.opine.ink',
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
    app.use(
      mongoSanitize({
        onSanitize: ({ req, key }) => {
          console.warn(`This request[${key}] is sanitized`, req.body);
        },
      }),
    );

    const upload = multer();

    app.get('/test', (req, res) =>
      res.send('User server is running successfully'),
    );

    app.get('/', authenticateToken, (req, res) => {
      controllers.getUserDetailsController.handle(req, res);
    });

    app.get('/registrationAnalytics', authenticateAdmin, (req, res) => {
      controllers.getRegistrationAnalyticsController.handle(req, res);
    });

    app.get('/reports', authenticateAdmin, (req, res) => {
      controllers.getReportedUsersController.handle(req, res);
    });

    app.post('/ban', authenticateAdmin, (req, res) => {
      controllers.banUserController.handle(req, res);
    });

    app.get('/:username', (req, res) => {
      controllers.getUserByUsernameController.handle(req, res);
    });

    app.post('/register', (req, res) =>
      controllers.createUserController.handle(req, res),
    );

    app.post('/report', (req, res) =>
      controllers.saveUserReportController.handle(req, res),
    );

    app.post(
      '/update',
      authenticateToken,
      upload.single('profile'),
      (req, res) => controllers.updateUserController.handle(req, res),
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

    app.post('/logout', authenticateToken, (req, res) => {
      controllers.logoutUserController.handle(req, res);
    });

    app.listen(port, () => {
      console.log(`Server is running in ${port}`);
    });
  }
}
