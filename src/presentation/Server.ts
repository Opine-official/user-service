import express from "express";
import { CreateUserController } from "./controllers/CreateUserController";

export class Server {
  public static async run(
    port: number,
    createUserController: CreateUserController
  ): Promise<void> {
    
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => res.send("Server is running"));

    app.post("/createUser", (req, res) =>
      createUserController.handle(req, res)
    );

    app.listen(port, () => {
      console.log(`Server is running in ${port}`);
    });
  }
}
