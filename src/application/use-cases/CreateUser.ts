import { User } from '../../domain/entities/User';
import { EmailService } from '../../infrastructure/email/EmailService';
import { IUseCase } from '../../shared/interfaces/IUseCase';
import { hashPassword } from '../../shared/utils/hashPassword';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { z } from 'zod';

export const ICreateUserDTOSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
  password: z
    .string()
    .refine(
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
          value,
        ),
      {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
      },
    ),
});

type ICreateUserDTO = z.infer<typeof ICreateUserDTOSchema>;
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
