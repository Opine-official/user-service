import mongoose from "mongoose";
import { CreateUser } from "./application/use-cases/CreateUser";
import { UserRepository } from "./infrastructure/repositories /UserRepository";
import { Server } from "./presentation/Server";
import { CreateUserController } from "./presentation/controllers/CreateUserController";
import { LoginUser } from "./application/use-cases/LoginUser";
import { LoginUserController } from "./presentation/controllers/LoginUserController";

export async function main(): Promise<void> {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/OpineUserService");
    console.log("Successfully connected to user service database");
  } catch (e) {
    console.log("Mongodb connection failed");
  }

  const userRepo = new UserRepository();

  const createUser = new CreateUser(userRepo);
  const loginUser = new LoginUser(userRepo);

  const createUserController = new CreateUserController(createUser);
  const loginUserController = new LoginUserController(loginUser);

  await Server.run(4001, createUserController, loginUserController);
}

main();
