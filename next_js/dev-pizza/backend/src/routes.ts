import { Router} from "express";
import { CreateUserController } from "./controllers/user/CreateUserController";
import { ListUsersController } from "./controllers/user/ListUsersController";
import { validateSchema } from "./middlewares/validateSchema";
import { authUserSchema, createUserSchema } from "./schemas/userSchame";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailuserController } from "./controllers/user/DetailUserController";
import { isAuthenticated } from "./middlewares/isAuthenticated";

const router = Router()

// USERS
router.get("/users", new ListUsersController().handle);
router.get("/me", isAuthenticated, new DetailuserController().handle);

router.post("/user", validateSchema(createUserSchema), new CreateUserController().handle);
router.post("/session", validateSchema(authUserSchema), new AuthUserController().handle); // LOGIN

export {router}