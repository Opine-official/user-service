import { User } from "../../domain/entities/User";
import { IUseCase } from "../../shared/IUseCase";
import { IUserRepository } from "../interfaces/IUserRepository";
import bcrypt from "bcrypt";

interface ICreateUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface ICreateUserResult {
  userId: string;
}

export class CreateUser implements IUseCase<ICreateUserDTO, ICreateUserResult> {
  public constructor(private readonly _userRepo: IUserRepository) {}

  public async execute(input: ICreateUserDTO): Promise<ICreateUserResult | Error> {
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = new User(
      input.name,
      input.username,
      input.email,
      hashedPassword
    );

    const saveResult = await this._userRepo.save(user);

    if (saveResult instanceof Error) {
      return saveResult;
    }

    return {
      userId: user.userId,
    };
  }
}
