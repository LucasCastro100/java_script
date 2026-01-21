import { Router, Request, Response } from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { ListUsersController } from "./controllers/user/ListUsersController";
import { validateSchema } from "./middlewares/validateSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchame";
import { AuthUserController } from "./controllers/user/AuthUserController";
const router = Router()

// USERS
router.get("/users", new ListUsersController().handle);
router.post("/user", validateSchema(createUserSchema), new CreateUserController().handle);

// LOGIN
router.post("/session", validateSchema(authUserSchema), new AuthUserController().handle);
export {router}