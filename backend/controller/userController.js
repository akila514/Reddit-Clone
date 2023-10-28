import asyncHandler from "../middleware/asyncHandler.js";
import { User } from "../models/User.js";
import createToken from "../util/createToken.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { userName, email, password } = req.body;

  const sameUser = await User.findOne({ userName });

  if (sameUser) {
    res.send("User already available.");
  } else {
    const user = await User.create({
      userName,
      email,
      password,
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

  if (availableUser && password === availableUser.password) {
    createToken(res, availableUser._id);

    res.json({ userName: availableUser.userName, email: availableUser.email });
  } else {
    res.json({ message: "This user do not exist." });
  }
});

const getAllJoinedCommunities = asyncHandler(async (req, res, next) => {
  const joinedCommunities = req.user.communities;

  console.log(joinedCommunities);

  if (joinedCommunities) {
    res.status(200).json(joinedCommunities);
  }
});

export { registerUser, loginUser, getAllJoinedCommunities };
