import { User } from '../entities/User';

export interface IUserRepository {
  save(user: User): Promise<string | Error>;
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
  getMongoIdFromUsername(username: string): Promise<string | Error>;
  banUser(username: string): Promise<string | Error>;
  updateTokenVersion(userId: string): Promise<number | Error>;
  compareTokenVersion(userId: string, tokenVersion: number): Promise<boolean>;
}
