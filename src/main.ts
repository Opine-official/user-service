import mongoose from "mongoose";
import { CreateUser } from "./application/use-cases/CreateUser";
import { UserRepository } from "./infrastructure/repositories /UserRepository";
import { Server } from "./presentation/Server";
import { CreateUserController } from "./presentation/controllers/CreateUserController";

export async function main(): Promise<void> {

  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/OpineUserService');
    console.log("Successfully connected to user service database")
  } catch (e) {
    console.log("Mongodb connection failed")
  }


  const userRepo = new UserRepository();
  const createUser = new CreateUser(userRepo);
  const createUserController = new CreateUserController(createUser);

  await Server.run(4001, createUserController);
}

main();
