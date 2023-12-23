import { User } from "../../domain/entities/User";

export interface IUserRepository {
  save(user: User): Promise<void | Error>;
  findByEmailOrUsername(emailOrUsername: string): Promise<User | null>;
  verifyUserEmail(email: string): Promise<Error | void>;
}
