import { User } from "../../domain/entities/User";
import { EmailService } from "../../infrastructure/email/EmailService";
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
  public constructor(
    private readonly _userRepo: IUserRepository,
    private readonly _emailService: EmailService
  ) {}

  public async execute(
    input: ICreateUserDTO
  ): Promise<ICreateUserResult | Error> {
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = new User(
      input.name,
      input.email,
      input.username,
      hashedPassword
    );

    const saveResult = await this._userRepo.save(user);

    if (saveResult instanceof Error) {
      return saveResult;
    }

    const emailResult = await this._emailService.send(
      user.email,
      user.emailVerificationCode
    );

    if (emailResult instanceof Error) {
      return emailResult;
    }

    return {
      userId: user.userId,
    };
  }
}
