import { Router } from "express";
import { createURL } from "../controllers/CreateURL";
import { getURL } from "../controllers/GetURL";
import { deleteURL } from "../controllers/DeleteURL";
import { updateURL } from "../controllers/UpdateURL";
import { increaseClickCount } from "../controllers/IncreaseClickCount";
import { authMiddleware } from "../middleware/AuthMiddleware";

const urlRouter = Router();

// public routes
urlRouter.get("/:shortCode", getURL);
urlRouter.put("/:shortCode/clicks", increaseClickCount);

// private routes
urlRouter.use(authMiddleware);
urlRouter.post("/new", createURL);
urlRouter.delete("delete/:shortCode", deleteURL);
urlRouter.put("/update", updateURL);

export default urlRouter;
