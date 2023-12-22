import { randomUUID } from "crypto";

export class User {
  constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly username: string,
    public readonly password: string,
    public readonly userId: string = randomUUID(),
    public readonly emailVerificationCode: string = Math.floor(Math.random() * 1000000).toString()
  ) {}
}
