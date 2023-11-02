import asyncHandler from "../middleware/asyncHandler.js";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";
import createToken from "../util/createToken.js";
import bcrypt from "bcryptjs";

const registerUser = asyncHandler(async (req, res, next) => {
  const { userName, email, password, profilePic } = req.body;

  const sameUser = await User.findOne({ userName });

  if (sameUser) {
    res.send("User already available.");
  } else {
    const user = await User.create({
      userName,
      email,
      profilePic,
      password: bcrypt.hashSync(password),
      posts: [],
      communities: [],
    });

    if (user) {
      createToken(res, user._id);

      res.status(201).json({ userName, email });
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  }
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { userName, password } = req.body;

  const availableUser = await User.findOne({ userName });

  if (availableUser && (await availableUser.matchPasswords(password))) {
    createToken(res, availableUser._id);

    res.json({
      userName: availableUser.userName,
      email: availableUser.email,
      profilePic: availableUser.profilePic,
    });
  } else {
    res.status(404).json({ message: "This user do not exist.", isError: true });
  }
});

const getAllJoinedCommunities = asyncHandler(async (req, res, next) => {
  const joinedCommunities = req.user.communities;

  if (joinedCommunities) {
    res.status(200).json(joinedCommunities);
  }
});

const getRecommendedPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();
  posts.sort(() => Math.random() - 0.5);

  res.status(200).json(posts);
});

const getUserPosts = asyncHandler(async (req, res, info) => {
  if (req.user) {
    res.status(200).json(req.user.posts);
  } else {
    res.status(404).json({ message: "Not Authorized" });
  }
});

export {
  registerUser,
  loginUser,
  getAllJoinedCommunities,
  getRecommendedPosts,
  getUserPosts,
};
