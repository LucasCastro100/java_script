import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { ListUsersController } from "./controllers/user/ListUsersController";
import { validateSchema } from "./middlewares/validateSchema";
import { createUserSchema } from "./schemas/userSchame";
const router = Router()

// USERS
router.get("/users", new ListUsersController().handle);
router.post("/user", validateSchema(createUserSchema), new CreateUserController().handle);
export {router}