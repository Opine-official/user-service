import { UserModel } from '../models/UserModel';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
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
        emailVerification: user.emailVerification,
      });

      await userDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async update(user: User): Promise<void | Error> {
    try {
      await UserModel.updateOne(
        { userId: user.userId },
        {
          name: user.name,
          email: user.email,
          username: user.username,
          password: user.password,
          userId: user.userId,
          emailVerification: user.emailVerification,
          profile: user.profile,
          website: user.website,
          location: user.location,
          bio: user.bio,
          twitter: user.twitter,
          instagram: user.instagram,
          linkedin: user.linkedin,
        },
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async getUserByUsername(username: string): Promise<User | null> {
    const userDocument = await UserModel.findOne({
      username: username,
    });

    if (!userDocument) {
      return null;
    }

    return new User({
      name: userDocument.name,
      email: userDocument.email,
      username: userDocument.username,
      password: userDocument.password,
      userId: userDocument.userId,
      emailVerification: userDocument.emailVerification,
      profile: userDocument.profile,
      website: userDocument.website,
      location: userDocument.location,
      bio: userDocument.bio,
      twitter: userDocument.twitter,
      instagram: userDocument.instagram,
      linkedin: userDocument.linkedin,
    });
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

    return new User({
      name: userDocument.name,
      email: userDocument.email,
      username: userDocument.username,
      password: userDocument.password,
      userId: userDocument.userId,
      emailVerification: userDocument.emailVerification,
    });
  }

  public async findById(userId: string): Promise<User | null> {
    const userDocument = await UserModel.findOne({
      userId,
    });

    if (!userDocument) {
      return null;
    }

    return new User({
      name: userDocument.name,
      email: userDocument.email,
      username: userDocument.username,
      password: userDocument.password,
      userId: userDocument.userId,
      emailVerification: userDocument.emailVerification,
      profile: userDocument.profile,
      website: userDocument.website,
      location: userDocument.location,
      bio: userDocument.bio,
      twitter: userDocument.twitter,
      instagram: userDocument.instagram,
      linkedin: userDocument.linkedin,
    });
  }

  public async saveEmailVerificationCode(
    email: string,
    otp: string,
  ): Promise<Error | void> {
    const userDocument = await UserModel.findOne({ email: email });

    if (!userDocument) {
      return new Error('User not found');
    }

    userDocument.emailVerification.code = otp;
    userDocument.emailVerification.expiry = new Date(
      Date.now() + 1000 * 60 * 5,
    );

    try {
      await userDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async verifyUserEmail(
    email: string,
    otp: string,
  ): Promise<Error | void> {
    const userDocument = await UserModel.findOne({ email: email });

    if (!userDocument) {
      return new Error('User not found');
    }

    if (new Date() > userDocument.emailVerification.expiry) {
      return new Error('OTP has expired');
    }

    if (userDocument.emailVerification.code !== otp) {
      return new Error('Wrong OTP');
    }

    userDocument.emailVerification.isVerified = true;

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
      return new Error('Failed OTP Verification: User not found');
    }

    if (
      !userDocument.passwordResetCode ||
      userDocument.passwordResetCode !== otp
    ) {
      return new Error('Invalid OTP');
    }
  }

  public async resetPassword(
    email: string,
    newPassword: string,
  ): Promise<Error | void> {
    const userDocument = await UserModel.findOne({ email: email });

    if (!userDocument) {
      return new Error('Failed reset password: User not found');
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

  public async getMongoIdFromUserId(userId: string): Promise<string | Error> {
    try {
      const userDocument = await UserModel.findOne({ userId: userId });

      if (!userDocument) {
        throw new Error('User not found');
      }

      return userDocument._id.toString();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }
}
