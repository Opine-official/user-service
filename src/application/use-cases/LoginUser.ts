import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import bcrypt from 'bcrypt';
import { IUseCase } from '../../shared/interfaces/IUseCase';
import jwt from 'jsonwebtoken';
import { IUserAnalyticsRepository } from '../../domain/interfaces/IUserAnalyticsRepository';
interface ILoginUserDTO {
  emailOrUsername: string;
  password: string;
}

export interface ILoginUserResult {
  userId: string;
  token: string;
}

export class LoginUser implements IUseCase<ILoginUserDTO, ILoginUserResult> {
  public constructor(
    private readonly _userRepo: IUserRepository,
    private readonly _userAnalyticsRepo: IUserAnalyticsRepository,
  ) {}

  public async execute(
    input: ILoginUserDTO,
  ): Promise<ILoginUserResult | Error> {
    const user = await this._userRepo.findByEmailOrUsername(
      input.emailOrUsername,
    );

    if (!user) {
      return new Error('User not found');
    }

    if (user.isBanned) {
      return new Error('User is banned');
    }

    const passwordMatch = await bcrypt.compare(input.password, user.password);

    if (!passwordMatch) {
      return new Error('Invalid password');
    }

    if (!user.emailVerification.isVerified) {
      return new Error('Email not verified');
    }

    const SECRET = process.env.JWT_SECRET;

    if (!SECRET) {
      return new Error('Missing JWT secret');
    }

    const token = jwt.sign({ userId: user.userId }, SECRET, {
      expiresIn: '24h',
    });

    const userAnalytics = await this._userAnalyticsRepo.updateLogin(
      user.userId,
    );

    if (userAnalytics instanceof Error) {
      return userAnalytics;
    }

    return {
      userId: user.userId,
      token,
    };
  }
}
