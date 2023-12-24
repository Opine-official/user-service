import express from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { LoginUserController } from "./controllers/LoginUserController";
import { VerifyUserEmailController } from "./controllers/VerifyUserController";
import { ResetPasswordController } from "./controllers/ResetPasswordController";
import { VerifyPasswordResetCodeController } from "./controllers/VerifyPasswordResetCodeController";
import { InitiatePasswordResetController } from "./controllers/InitiatePasswordResetController";

export class Server {
  public static async run(
    port: number,
    createUserController: CreateUserController,
    loginUserController: LoginUserController,
    verifyUserEmailController: VerifyUserEmailController,
    initiatePasswordResetController: InitiatePasswordResetController,
    verifyPasswordResetCodeController: VerifyPasswordResetCodeController,
    resetPasswordController: ResetPasswordController
  ): Promise<void> {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => res.send("Server is running"));

    app.post("/createUser", (req, res) =>
      createUserController.handle(req, res)
    );

    app.post("/loginUser", (req, res) => loginUserController.handle(req, res));

    app.post("/verifyEmail", (req, res) => {
      verifyUserEmailController.handle(req, res);
    });

    app.post("/initiatePasswordReset", (req, res) => {
      initiatePasswordResetController.handle(req, res);
    });

    app.post("/verifyPasswordResetCode", (req, res) => {
      verifyPasswordResetCodeController.handle(req, res);
    });

    app.post("/resetPassword", (req, res) => {
      resetPasswordController.handle(req, res);
    });

    app.post("/changePassword", (req, res) => {
      // Logic to change user password
    });

    app.post("/refreshToken", (req, res) => {
      // Logic to refresh user token
    });

    app.post("/logoutUser", (req, res) => {
      // Logic to logout user
    });

    app
      .get("/me", (req, res) => {
        // Logic to get user details
      })
      .put("/me", (req, res) => {
        // Logic to update user details
      });

    app.listen(port, () => {
      console.log(`Server is running in ${port}`);
    });
  }
}
