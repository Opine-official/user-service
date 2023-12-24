import { randomUUID } from "crypto";
import { generateOTP } from "../../shared/utils/generateOTP";

export class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly username: string,
    public readonly password: string,
    public isEmailVerified: boolean = false,
    public readonly userId: string = randomUUID(),
    public readonly emailVerificationCode: string = generateOTP()
  ) {}
}
