import { Request, Response } from "express";
import { DetailUserService } from "../../services/user/DetailuserService";


export class DetailuserController{
    async handle(req: Request, res: Response){
        const user_id = req.user_id;

        const detailUser = new DetailUserService();
        const user = await detailUser.execute(user_id);

        return res.json(user);
    }
}