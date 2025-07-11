import express from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.post("/logout", logoutController);

export default authRouter;
