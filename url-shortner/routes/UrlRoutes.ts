import { Router } from "express";
import { createURL } from "../controllers/url/CreateURL";
import { getURL } from "../controllers/url/GetURL";
import { deleteURL } from "../controllers/url/DeleteURL";
import { updateURL } from "../controllers/url/UpdateURL";
import { increaseClickCount } from "../controllers/url/IncreaseClickCount";
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
