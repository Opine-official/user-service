import { randomUUID } from 'crypto';

type UserAnalyticsParams = {
  userAnalyticsId?: string;
  username: string;
  registrationDate: Date;
  userId: string;
  user: string;
  lastLogin?: Date;
  lastLogout?: Date;
  loginCount?: number;
  logoutCount?: number;
};

export class UserAnalytics {
  userAnalyticsId: string;
  username: string;
  registrationDate: Date;
  userId: string;
  user: string;
  lastLogin: Date;
  lastLogout: Date;
  loginCount: number;
  logoutCount: number;

  constructor({
    userAnalyticsId = randomUUID(),
    username,
    registrationDate = new Date(),
    userId,
    user,
    lastLogin = new Date(),
    lastLogout = new Date(),
    loginCount = 0,
    logoutCount = 0,
  }: UserAnalyticsParams) {
    this.userAnalyticsId = userAnalyticsId;
    this.username = username;
    this.registrationDate = registrationDate;
    this.userId = userId;
    this.user = user;
    this.lastLogin = lastLogin;
    this.lastLogout = lastLogout;
    this.loginCount = loginCount;
    this.logoutCount = logoutCount;
  }
}
