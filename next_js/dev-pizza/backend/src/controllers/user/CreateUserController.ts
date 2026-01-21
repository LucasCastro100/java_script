import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateuserService";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({
      name: name,
      email: email,
      password: password,
    });

    res.json({ msg: user, data: { name, email, password } });
  }
}
