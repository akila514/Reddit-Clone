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

  if (searchedText !== "" || searchedText !== null) {
    try {
      const availableList = await Community.find({
        name: { $regex: new RegExp(searchedText, "i") },
      });

      res.json(availableList);
    } catch (error) {
      next(error);
    }
  } else {
    res.json([]);
  }
});

const getCommunityById = async (req, res, next) => {
  const id = req.params.id;

  const community = await Community.findById(id);

  if (community) {
    res.status(200).json(community);
  } else {
    res.status(404).json({ message: "Community not found." });
  }
};

export { createCommunity, getSearchedCommunities, getCommunityById };
