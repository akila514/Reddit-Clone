import express from "express";
import {
  getAllJoinedCommunities,
  loginUser,
  registerUser,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.route("/signup").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/getallcommunities").get(protect, getAllJoinedCommunities);

export default userRouter;
