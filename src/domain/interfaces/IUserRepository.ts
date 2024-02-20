import { User } from '../entities/User';

export interface IUserRepository {
  save(user: User): Promise<void | Error>;
  update(user: User): Promise<void | Error>;
  getUserByUsername(userId: string): Promise<User | null | Error>;
  findByEmailOrUsername(emailOrUsername: string): Promise<User | null>;
  findById(userId: string): Promise<User | null>;
  saveEmailVerificationCode(email: string, otp: string): Promise<void | Error>;
  verifyUserEmail(email: string, otp: string): Promise<Error | void>;
  savePasswordResetCode(email: string, otp: string): Promise<Error | void>;
  verifyPasswordResetCode(email: string, otp: string): Promise<Error | void>;
  resetPassword(
    emailOrUsername: string,
    newPassword: string,
  ): Promise<Error | void>;
  getMongoIdFromUserId(userId: string): Promise<string | Error>;
}
