import express from "express";
import { registerUser } from "../controller/userController.js";

const userRouter = express.Router();

userRouter.route("/signup").post(registerUser);

export default userRouter;
