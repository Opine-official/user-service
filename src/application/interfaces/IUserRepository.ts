import { User } from "../../domain/entities/User";

export interface IUserRepository {
  save(user: User): Promise<void | Error>;
  findByEmailOrUsername(emailOrUsername: string): Promise<User | null>;
  verifyUserEmail(email: string): Promise<Error | void>;
  savePasswordResetCode(email: string, otp: string): Promise<Error | void>;
  verifyPasswordResetCode(email: string, otp: string): Promise<Error | void>;
  resetPassword(
    emailOrUsername: string,
    newPassword: string
  ): Promise<Error | void>;
}
