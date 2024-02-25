import { UserAnalytics } from '../../domain/entities/UserAnalytics';
import {
  IUserAnalyticsRepository,
  RegistrationUserAnalytics,
} from '../../domain/interfaces/IUserAnalyticsRepository';
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

  public async updateLogin(userId: string): Promise<void | Error> {
    try {
      await UserAnalyticsModel.findOne(
        {
          userId,
        },
        {
          loginTime: new Date(),
          $inc: { loginCount: 1 },
        },
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async updateLogout(userId: string): Promise<void | Error> {
    try {
      await UserAnalyticsModel.findOne(
        {
          userId,
        },
        {
          logoutTime: new Date(),
          $inc: { logoutCount: 1 },
        },
      );
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }

  public async getRegistrationAnalytics(): Promise<
    RegistrationUserAnalytics[] | Error
  > {
    try {
      const result = await UserAnalyticsModel.aggregate([
        {
          $group: {
            _id: {
              year: { $year: '$registrationDate' },
              month: { $month: '$registrationDate' },
              day: { $dayOfMonth: '$registrationDate' },
            },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            date: {
              $dateFromParts: {
                year: '$_id.year',
                month: '$_id.month',
                day: '$_id.day',
              },
            },
            count: 1,
          },
        },
        { $sort: { date: 1 } },
      ]);

      if (result.length === 0) {
        throw new Error('No user analytics found');
      }

      return result;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return new Error(error.message);
      }
      return new Error('Something went wrong');
    }
  }
}
