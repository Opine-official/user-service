import { IUserRepository } from "../interfaces/IUserRepository";
import bcrypt from "bcrypt";
import { IUseCase } from "../../shared/IUseCase";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface ILoginUserDTO {
  emailOrUsername: string;
  password: string;
}

export interface ILoginUserResult {
  userId: string;
  token: string;
}

export class LoginUser implements IUseCase<ILoginUserDTO, ILoginUserResult> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public async execute(
    input: ILoginUserDTO
  ): Promise<ILoginUserResult | Error> {
    const user = await this._userRepo.findByEmailOrUsername(
      input.emailOrUsername
    );

    if (!user) {
      return new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(input.password, user.password);

    if (!passwordMatch) {
      return new Error("Invalid password");
    }

    const SECRET = process.env.JWT_SECRET;

    if (!SECRET) {
      return new Error("Missing JWT secret");
    }

    const token = jwt.sign({ userId: user.userId }, SECRET, {
      expiresIn: "1h",
    });

    return {
      userId: user.userId,
      token,
    };
  }
}
