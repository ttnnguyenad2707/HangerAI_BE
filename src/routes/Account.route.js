import express from "express";
import AccountController from "../controllers/Account.controller.js";
import validateData from "../validations/ValidateData.js";
import accountValidate from "../validations/Account.validate.js";
const AccountRoute = express.Router();

AccountRoute.get("/profile/:accountId", AccountController.getProfile)
AccountRoute.put("/profile/:accountId", validateData(accountValidate.validateProfile), AccountController.updateProfile)

export default AccountRoute;
