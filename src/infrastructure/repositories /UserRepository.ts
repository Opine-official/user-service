import { UserModel } from "../models/UserModel";
import { IUserRepository } from "../../application/interfaces/IUserRepository";
import { User } from "../../domain/entities/User";

export class UserRepository implements IUserRepository {
  public async save(user: User): Promise<void> {
    try {
      const userDocument = new UserModel({
        name: user.name,
        email: user.email,
        username: user.username,
        password: user.password,
        userId: user.userId,
      });

      await userDocument.save();
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
