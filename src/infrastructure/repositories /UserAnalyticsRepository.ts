import { UserAnalytics } from '../../domain/entities/UserAnalytics';
import { IUserAnalyticsRepository } from '../../domain/interfaces/IUserAnalyticsRepository';
import { UserAnalyticsModel } from '../models/UserAnalyticsModel';

export class UserAnalyticsRepository implements IUserAnalyticsRepository {
  public async get(userAnalyticsId: string): Promise<UserAnalytics | Error> {
    try {
      const userAnalyticsDocument =
        await UserAnalyticsModel.findById(userAnalyticsId);

      if (!userAnalyticsDocument) {
        throw new Error('UserAnalytics not found');
      }

      const result = new UserAnalytics({
        userAnalyticsId: userAnalyticsDocument.userAnalyticsId,
        username: userAnalyticsDocument.username,
        registrationDate: userAnalyticsDocument.registrationDate,
        lastLogin: userAnalyticsDocument.lastLogin,
        lastLogout: userAnalyticsDocument.lastLogout,
        loginCount: userAnalyticsDocument.loginCount,
        logoutCount: userAnalyticsDocument.logoutCount,
        userId: userAnalyticsDocument.userId,
        user: userAnalyticsDocument.user as unknown as string,
      });

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async save(userAnalytics: UserAnalytics): Promise<void | Error> {
    try {
      const userAnalyticsDocument = new UserAnalyticsModel(userAnalytics);
      await userAnalyticsDocument.save();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async update(userAnalytics: UserAnalytics): Promise<void | Error> {
    try {
      await UserAnalyticsModel.findByIdAndUpdate(
        userAnalytics.userAnalyticsId,
        userAnalytics,
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async delete(userAnalyticsId: string): Promise<void | Error> {
    try {
      await UserAnalyticsModel.findByIdAndDelete(userAnalyticsId);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async getAnalytics(): Promise<UserAnalytics[] | Error> {
    try {
      const userAnalyticsDocuments = await UserAnalyticsModel.find();

      const result = userAnalyticsDocuments.map((userAnalyticsDocument) => {
        return new UserAnalytics({
          userAnalyticsId: userAnalyticsDocument.userAnalyticsId,
          username: userAnalyticsDocument.username,
          registrationDate: userAnalyticsDocument.registrationDate,
          lastLogin: userAnalyticsDocument.lastLogin,
          lastLogout: userAnalyticsDocument.lastLogout,
          loginCount: userAnalyticsDocument.loginCount,
          logoutCount: userAnalyticsDocument.logoutCount,

          userId: userAnalyticsDocument.userId,
          user: userAnalyticsDocument.user as unknown as string,
        });
      });

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async updateLogin(userAnalyticsId: string): Promise<void | Error> {
    try {
      await UserAnalyticsModel.findByIdAndUpdate(userAnalyticsId, {
        loginTime: new Date(),
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async updateLogout(userAnalyticsId: string): Promise<void | Error> {
    try {
      await UserAnalyticsModel.findByIdAndUpdate(userAnalyticsId, {
        logoutTime: new Date(),
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }
}