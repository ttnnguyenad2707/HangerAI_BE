import express from "express";
import AIToolsController from "../controllers/AI-Tools.controller.js";
import { verifyTokenAccountLevelPro } from "../middlewares/verifyToken.middleware.js";
const aiToolsRouter = express.Router();

aiToolsRouter.get("/image-to-text",verifyTokenAccountLevelPro,AIToolsController.useImageToText)
export default aiToolsRouter;