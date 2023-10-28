import asyncHandler from "../middleware/asyncHandler.js";
import { Community } from "../models/Community.js";

const createCommunity = asyncHandler(async (req, res, next) => {
  const { name, description, profileImage } = req.body;

  const sameCommunity = await Community.findOne({ name });

  if (sameCommunity) {
    res.status(400).json({ message: "This community name is already taken." });
  } else {
    const community = await Community.create({
      name,
      description,
      profileImage,
      users: [],
      posts: [],
    });

    if (community) {
      res.status(201).json({ name, description });
    } else {
      res.status(400).json({ message: "Somthing went wrong." });
    }
  }
});

export { createCommunity };
