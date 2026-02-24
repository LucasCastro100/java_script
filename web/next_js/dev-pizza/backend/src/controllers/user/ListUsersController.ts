import { Request, Response } from "express";
import { ListUserService } from "../../services/user/ListUsersService";

export class ListUsersController {
    async handle(req: Request, res: Response) {
        const listUsersService = new ListUserService()  
        const users = await listUsersService.execute()

        res.json(users);
    }
}