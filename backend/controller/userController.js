import asyncHandler from "../middleware/asyncHandler.js";
import { User } from "../models/User.js";

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
      res.status(201).json({ userName, email });
    } else {
      res.status(400).json({ message: "Something went wrong" });
    }
  }
});

export { registerUser };
