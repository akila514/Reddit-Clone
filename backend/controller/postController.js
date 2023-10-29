import asyncHandler from "../middleware/asyncHandler.js";
import { Community } from "../models/Community.js";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

const createPost = asyncHandler(async (req, res, next) => {
  const { communityId, title, description } = req.body;

  const community = await Community.findById(communityId);
  const user = await User.findById(req.user._id);

  if (community) {
    const post = await Post.create({
      communityId,
      userId: req.user._id,
      userName: req.user.userName,
      createdAt: Date.now(),
      title,
      description,
    });

    try {
      const userPosts = user.posts;
      user.posts = [...userPosts, post];

      const communityPosts = community.posts;
      community.posts = [...communityPosts, post];

      await user.save();
      await community.save();

      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong." });
    }
  }
});

export { createPost };
