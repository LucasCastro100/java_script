import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateuserService";


export class CreateUserController {
  async handle(req: Request, res: Response) {
    const createUserService = new CreateUserService()
    const user = await createUserService.execute()

    const {name, email, password } = req.body;
    res.json({ msg: user, data: {name, email, password} });
  }
}
