import { Request, Response, NextFunction } from 'express';
import { IUserRepository } from '../../domain/interfaces/IUserRepository';
import { UserRepository } from '../repositories /UserRepository';

export function checkUserTokenVersion() {
  return async (req: Request, res: Response, next: NextFunction) => {
    const userRepo: IUserRepository = new UserRepository();

    try {
      const tokenVersion = req.user.tokenVersion;

      if (!tokenVersion) {
        return res.status(401).json({ error: 'Invalid token' });
      }

      const compareTokenVersion = await userRepo.compareTokenVersion(
        req.user.userId,
        tokenVersion,
      );

      if (!compareTokenVersion) {
        return res.status(401).json({ error: 'Invalid token' });
      }
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}
