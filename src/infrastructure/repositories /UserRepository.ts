import { UserModel } from "../models/UserModel";
import { IUserRepository } from "../../application/interfaces/IUserRepository";
import { User } from "../../domain/entities/User";

export class UserRepository implements IUserRepository {
  public async save(user: User): Promise<Error | void> {
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
      return new Error(error.message);
    }
  }

  public async findByEmailOrUsername(
    emailOrUsername: string
  ): Promise<User | null> {
    const userDocument = await UserModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!userDocument) {
      return null;
    }

    return new User(
      userDocument.name,
      userDocument.username,
      userDocument.email,
      userDocument.password,
      userDocument.userId
    );
  }
}
