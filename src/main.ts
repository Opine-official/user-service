import { CreateUser } from "./application/use-cases/CreateUser";
import { UserRepository } from "./infrastructure/repositories /UserRepository";
import { Server } from "./presentation/Server";
import { CreateUserController } from "./presentation/controllers/CreateUserController";
import { LoginUser } from "./application/use-cases/LoginUser";
import { LoginUserController } from "./presentation/controllers/LoginUserController";
import { EmailService } from "./infrastructure/email/EmailService";
import { DatabaseConnection } from "./infrastructure/database/Connection";
import { VerifyUserEmail } from "./application/use-cases/VerifyUserEmail";
import { VerifyUserEmailController } from "./presentation/controllers/VerifyUserController";
import { ResetPassword } from "./application/use-cases/ResetPassword";
import { ResetPasswordController } from "./presentation/controllers/ResetPasswordController";

export async function main(): Promise<void> {
  await DatabaseConnection.connect();

  const userRepo = new UserRepository();
  const emailService = new EmailService(process.env.SEND_EMAIL as string);

  const createUser = new CreateUser(userRepo, emailService);
  const loginUser = new LoginUser(userRepo);
  const verifyUserEmail = new VerifyUserEmail(userRepo);
  const resetPassword = new ResetPassword(userRepo);

  const createUserController = new CreateUserController(createUser);
  const loginUserController = new LoginUserController(loginUser);
  const verifyUserEmailController = new VerifyUserEmailController(
    verifyUserEmail
  );
  const resetPasswordController = new ResetPasswordController(resetPassword);

  await Server.run(
    4001,
    createUserController,
    loginUserController,
    verifyUserEmailController,
    resetPasswordController
  );
}

main();
