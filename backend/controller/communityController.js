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

const getSearchedCommunities = asyncHandler(async (req, res, next) => {
  const { searchedText } = req.body;

  try {
    // Use regular expression to perform a case-insensitive search on the 'name' field
    const availableList = await Community.find({
      name: { $regex: new RegExp(searchedText, "i") },
    });

    res.json(availableList);
  } catch (error) {
    // Handle any potential errors here
    next(error);
  }
});

export { createCommunity, getSearchedCommunities };
