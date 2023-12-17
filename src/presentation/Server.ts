import express from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { LoginUserController } from "./controllers/LoginUserController";

export class Server {
  public static async run(
    port: number,
    createUserController: CreateUserController,
    loginUserController: LoginUserController
  ): Promise<void> {

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => res.send("Server is running"));

    app.post("/createUser", (req, res) =>
      createUserController.handle(req, res)
    );
    
    app.post("/loginUser", (req, res) =>
    loginUserController.handle(req, res)
  );

    app.listen(port, () => {
      console.log(`Server is running in ${port}`);
    });
  }
}
