import { UserModel } from '../models/UserModel';
import { IUserRepository } from '../../application/interfaces/IUserRepository';
import { User } from '../../domain/entities/User';

export class UserRepository implements IUserRepository {
  public async save(user: User): Promise<Error | void> {
    try {
      const userDocument = new UserModel({
        name: user.name,
        email: user.email,
        username: user.username,
        password: user.password,
        userId: user.userId,
        isEmailVerified: user.isEmailVerified,
        emailVerificationCode: user.emailVerificationCode,
      });

      await userDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async findByEmailOrUsername(
    emailOrUsername: string,
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
      userDocument.isEmailVerified,
      userDocument.userId,
      userDocument.emailVerificationCode,
    );
  }

  public async saveEmailVerificationCode(
    email: string,
    otp: string,
  ): Promise<Error | void> {
    const userDocument = await UserModel.findOne({ email: email });

    if (!userDocument) {
      return new Error('User not found');
    }

    userDocument.emailVerificationCode = otp;

    try {
      await userDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async verifyUserEmail(email: string): Promise<Error | void> {
    const userDocument = await UserModel.findOne({ email: email });

    if (!userDocument) {
      return new Error('User not found');
    }

    userDocument.isEmailVerified = true;

    try {
      await userDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async savePasswordResetCode(
    email: string,
    otp: string,
  ): Promise<Error | void> {
    const userDocument = await UserModel.findOne({ email: email });

    if (!userDocument) {
      return new Error('User not found');
    }

    userDocument.passwordResetCode = otp;

    try {
      await userDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async verifyPasswordResetCode(
    email: string,
    otp: string,
  ): Promise<Error | void> {
    const userDocument = await UserModel.findOne({ email: email });

    if (!userDocument) {
      return new Error('User not found');
    }

    if (userDocument.passwordResetCode !== otp) {
      return new Error('Invalid OTP');
    }
  }

  public async resetPassword(
    emailOrUsername: string,
    newPassword: string,
  ): Promise<Error | void> {
    const userDocument = await UserModel.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
    });

    if (!userDocument) {
      return new Error('User not found');
    }

    userDocument.password = newPassword;

    try {
      await userDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }
}
