import { Request, Response } from "express";
import { VerifyUserEmail } from "../../application/use-cases/VerifyUserEmail";
import { IController } from "../../shared/interfaces/IController";

export class VerifyUserEmailController implements IController {
  public constructor(private readonly _useCase: VerifyUserEmail) {}

  public async handle(req: Request, res: Response): Promise<void> {
    const result = await this._useCase.execute({
      email: req.body.email,
      otp: req.body.otp,
    });

    if (result instanceof Error) {
      res.status(400).json({ error: result.message });
      return;
    }

    res.status(200).json({ message: "Email verified successfully" });
  }
}