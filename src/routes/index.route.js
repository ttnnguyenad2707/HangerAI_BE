
import express from "express";
import AuthRoute from "./auth.route.js";
import GoogleAuthRoute from "./googleAuth.route.js";
import AccountRoute from "./account.route.js";

const indexRouter = express.Router();

indexRouter.use("/account", AccountRoute)
indexRouter.use("/auth/google", GoogleAuthRoute)
indexRouter.use("/auth", AuthRoute);

export default indexRouter;