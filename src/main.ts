import mongoose from "mongoose";
import { CreateUser } from "./application/use-cases/CreateUser";
import { UserRepository } from "./infrastructure/repositories /UserRepository";
import { Server } from "./presentation/Server";
import { CreateUserController } from "./presentation/controllers/CreateUserController";
import { LoginUser } from "./application/use-cases/LoginUser";
import { LoginUserController } from "./presentation/controllers/LoginUserController";
import { EmailService } from "./infrastructure/email/EmailService";
import { DatabaseConnection } from "./infrastructure/database/Connection";

export async function main(): Promise<void> {
  await DatabaseConnection.connect();

  const userRepo = new UserRepository();
  const emailService = new EmailService();

  const createUser = new CreateUser(userRepo, emailService);
  const loginUser = new LoginUser(userRepo);

  const createUserController = new CreateUserController(createUser);
  const loginUserController = new LoginUserController(loginUser);

  await Server.run(4001, createUserController, loginUserController);
}

main();
