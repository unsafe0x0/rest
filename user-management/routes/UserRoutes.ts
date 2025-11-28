import { Router } from "express";
import { authMiddleware } from "../middleware/AuthMiddleware";
import { registerUser } from "../controllers/Resigter";
import { loginUser } from "../controllers/Login";
import { updateUser } from "../controllers/Update";
import { deleteUser } from "../controllers/Delete";
import { getDashboard } from "../controllers/Dashboard";

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
