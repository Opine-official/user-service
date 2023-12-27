import { randomUUID } from 'crypto';
import { generateOTP } from '../../shared/utils/generateOTP';

type emailVerification = {
  code: string;
  expiry: Date;
  isVerified: boolean;
};

export class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly username: string,
    public readonly password: string,
    public readonly userId: string = randomUUID(),
    public emailVerification: emailVerification = {
      code: generateOTP(),
      expiry: new Date(Date.now() + 1000 * 60 * 60),
      isVerified: false,
    },
  ) {}
}
