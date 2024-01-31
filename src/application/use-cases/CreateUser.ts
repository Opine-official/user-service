import { User } from '../../domain/entities/User';
import { EmailService } from '../../infrastructure/email/EmailService';
import { IUseCase } from '../../shared/interfaces/IUseCase';
import { hashPassword } from '../../shared/utils/hashPassword';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';

interface ICreateUserDTO {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface ICreateUserResult {
  email: string;
  userId: string;
}

export class CreateUser implements IUseCase<ICreateUserDTO, ICreateUserResult> {
  public constructor(
    private readonly _userRepo: IUserRepository,
    private readonly _emailService: EmailService,
  ) {}

  public async execute(
    input: ICreateUserDTO,
  ): Promise<ICreateUserResult | Error> {
    const hashPasswordResult = await hashPassword(input.password);

    if (hashPasswordResult instanceof Error) {
      return hashPasswordResult;
    }

    const user = new User({
      name: input.name,
      email: input.email,
      username: input.username,
      password: hashPasswordResult,
    });
    const saveResult = await this._userRepo.save(user);

    if (saveResult instanceof Error) {
      return saveResult;
    }

    const emailResult = await this._emailService.send(
      user.email,
      user.emailVerification.code,
    );

    if (emailResult instanceof Error) {
      return emailResult;
    }

    return {
      email: user.email,
      userId: user.userId,
    };
  }
}
