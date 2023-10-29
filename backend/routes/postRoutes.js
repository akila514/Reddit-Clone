import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createPost } from "../controller/postController.js";

const postRouter = express.Router();

postRouter.route("/").post(protect, createPost);

export default postRouter;
