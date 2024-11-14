import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import express from "express";
const authRouter = express.Router();

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);

export default authRouter;
