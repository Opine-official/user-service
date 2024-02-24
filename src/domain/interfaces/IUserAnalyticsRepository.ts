import { UserAnalytics } from '../entities/UserAnalytics';

export type RegistrationUserAnalytics = {
  count: number;
  values: {
    date: Date;
    username: string;
    userId: string;
  }[];
};

export interface IUserAnalyticsRepository {
  get(userAnalyticsId: string): Promise<UserAnalytics | Error>;
  save(userAnalytics: UserAnalytics): Promise<void | Error>;
  update(userAnalytics: UserAnalytics): Promise<void | Error>;
  delete(userAnalyticsId: string): Promise<void | Error>;
  getAnalytics(): Promise<UserAnalytics[] | Error>;
  updateLogin(userId: string): Promise<void | Error>;
  updateLogout(userId: string): Promise<void | Error>;
  getRegistrationAnalytics(): Promise<RegistrationUserAnalytics | Error>;
}
