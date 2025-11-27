import { Router } from "express";
import { authMiddleware } from "../middleware/AuthMiddleware";
import { registerUser } from "../controllers/user/Resigter";
import { loginUser } from "../controllers/user/Login";
import { updateUser } from "../controllers/user/Update";
import { deleteUser } from "../controllers/user/Delete";
import { getDashboard } from "../controllers/user/Dashboard";

const userRouter = Router();

// public routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

// private routes
userRouter.use(authMiddleware);
userRouter.get("/dashboard", getDashboard);
userRouter.delete("/delete", deleteUser);
userRouter.put("/update", updateUser);

export default userRouter;
