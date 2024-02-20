import { UserReport } from '../entities/UserReport';

export interface IUserReportRepository {
  get(userReportId: string): Promise<UserReport | Error>;
  save(userReport: UserReport): Promise<void | Error>;
  update(userReport: UserReport): Promise<void | Error>;
  delete(userReportId: string): Promise<void | Error>;
  getReportedUsers(): Promise<UserReport[] | Error>;
}
