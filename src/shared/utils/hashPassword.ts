import bcrypt from "bcrypt";

export async function hashPassword(password: string): Promise<Error | string> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error: unknown) {
    if (error instanceof Error) {
      return error;
    }
    return new Error("Something went wrong");
  }
}