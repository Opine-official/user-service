import { CreateUser } from './application/use-cases/CreateUser';
import { UserRepository } from './infrastructure/repositories /UserRepository';
import { Server } from './infrastructure/Server';
import { CreateUserController } from './presentation/controllers/CreateUserController';
import { LoginUser } from './application/use-cases/LoginUser';
import { LoginUserController } from './presentation/controllers/LoginUserController';
import { EmailService } from './infrastructure/email/EmailService';
import { DatabaseConnection } from './infrastructure/database/Connection';
import { VerifyUserEmail } from './application/use-cases/VerifyUserEmail';
import { VerifyUserEmailController } from './presentation/controllers/VerifyUserEmailController';
import { ResetPassword } from './application/use-cases/ResetPassword';
import { ResetPasswordController } from './presentation/controllers/ResetPasswordController';
import { InitiatePasswordReset } from './application/use-cases/InitiatePasswordReset';
import { InitiatePasswordResetController } from './presentation/controllers/InitiatePasswordResetController';
import { VerifyPasswordResetCode } from './application/use-cases/VerifyPasswordResetCode';
import { VerifyPasswordResetCodeController } from './presentation/controllers/VerifyPasswordResetCodeController';
import { LogoutUserController } from './presentation/controllers/LogoutUserController';
import { ResendOTP } from './application/use-cases/ResendOTP';
import { ResendOTPController } from './presentation/controllers/ResendOTPController';
import { KafkaMessageProducer } from './infrastructure/brokers/kafka/KafkaMessageProducer';
import { GetUserDetails } from './application/use-cases/GetUserDetails';
import { GetUserDetailsController } from './presentation/controllers/GetUserDetailsController';
import { UpdateUser } from './application/use-cases/UpdateUser';
import { UpdateUserController } from './presentation/controllers/UpdateUserController';
import { GetUserByUsername } from './application/use-cases/GetUserByUsername';
import { GetUserByUsernameController } from './presentation/controllers/GetUserByUsernameController';
import { S3UploadService } from './infrastructure/s3/S3UploadService';
import { SaveUserReport } from './application/use-cases/SaveUserReport';
import { UserReportRepository } from './infrastructure/repositories /UserReportRepository';
import { SaveUserReportController } from './presentation/controllers/SaveUserReportController';
import { GetReportedUsers } from './application/use-cases/GetReportedUsers';
import { GetReportedUsersController } from './presentation/controllers/GetReportedUsersController';
import { UserAnalyticsRepository } from './infrastructure/repositories /UserAnalyticsRepository';
import { LogoutUser } from './application/use-cases/LogoutUser';
import { GetRegistrationAnalytics } from './application/use-cases/GetRegistrationAnalytics';
import { GetRegistrationAnalyticsController } from './presentation/controllers/GetRegistrationAnalyticsController';
import { BanUser } from './application/use-cases/BanUser';
import { BanUserController } from './presentation/controllers/BanUserController';

export async function main(): Promise<void> {
  await DatabaseConnection.connect();

  const userRepo = new UserRepository();
  const userReportRepo = new UserReportRepository();
  const userAnalyticsRepo = new UserAnalyticsRepository();
  const emailService = new EmailService(process.env.SEND_EMAIL as string);
  const kafkaMessageProducer = new KafkaMessageProducer();
  const s3UploadService = new S3UploadService();

  const createUser = new CreateUser(userRepo, emailService, userAnalyticsRepo);
  const updateUser = new UpdateUser(
    userRepo,
    s3UploadService,
    kafkaMessageProducer,
  );
  const loginUser = new LoginUser(userRepo, userAnalyticsRepo);
  const logoutUser = new LogoutUser(userAnalyticsRepo);
  const resendOTP = new ResendOTP(userRepo, emailService);
  const verifyUserEmail = new VerifyUserEmail(userRepo, kafkaMessageProducer);
  const initiatePasswordReset = new InitiatePasswordReset(
    userRepo,
    emailService,
  );
  const verifyPasswordResetCode = new VerifyPasswordResetCode(userRepo);
  const resetPassword = new ResetPassword(userRepo);
  const getUserDetails = new GetUserDetails(userRepo);
  const getUserByUsername = new GetUserByUsername(userRepo);
  const saveUserReport = new SaveUserReport(userReportRepo, userRepo);
  const getReportedUsers = new GetReportedUsers(userReportRepo);
  const getRegistrationAnalytics = new GetRegistrationAnalytics(
    userAnalyticsRepo,
  );
  const banUser = new BanUser(userRepo, userReportRepo);

  const createUserController = new CreateUserController(createUser);
  const updateUserController = new UpdateUserController(updateUser);
  const loginUserController = new LoginUserController(loginUser);
  const resendOTPController = new ResendOTPController(resendOTP);
  const verifyUserEmailController = new VerifyUserEmailController(
    verifyUserEmail,
  );
  const initiatePasswordResetController = new InitiatePasswordResetController(
    initiatePasswordReset,
  );
  const verifyPasswordResetCodeController =
    new VerifyPasswordResetCodeController(verifyPasswordResetCode);
  const resetPasswordController = new ResetPasswordController(resetPassword);
  const getUserDetailsController = new GetUserDetailsController(getUserDetails);
  const getUserByUsernameController = new GetUserByUsernameController(
    getUserByUsername,
  );

  const logoutUserController = new LogoutUserController(logoutUser);
  const saveUserReportController = new SaveUserReportController(saveUserReport);
  const getReportedUsersController = new GetReportedUsersController(
    getReportedUsers,
  );
  const getRegistrationAnalyticsController =
    new GetRegistrationAnalyticsController(getRegistrationAnalytics);
  const banUserController = new BanUserController(banUser);

  await Server.run(4001, {
    createUserController,
    updateUserController,
    loginUserController,
    resendOTPController,
    verifyUserEmailController,
    initiatePasswordResetController,
    verifyPasswordResetCodeController,
    resetPasswordController,
    logoutUserController,
    getUserDetailsController,
    getUserByUsernameController,
    saveUserReportController,
    getReportedUsersController,
    getRegistrationAnalyticsController,
    banUserController,
  });
}

main();
