import express from "express";
import { loginUser, registerUser } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.route("/signup").post(registerUser);
userRouter.route("/login").post(loginUser);

export default userRouter;
