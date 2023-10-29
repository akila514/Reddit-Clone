import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createPost,
  downVotePost,
  upVotePost,
} from "../controller/postController.js";

const postRouter = express.Router();

postRouter.route("/").post(protect, createPost);
postRouter.route("/:id/upvote").post(protect, upVotePost);
postRouter.route("/:id/downvote").post(protect, downVotePost);

export default postRouter;
