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

const joinCommunity = asyncHandler(async (req, res, next) => {
  const community = await Community.findById(req.params.id);
  const user = req.user;

  if (community && user) {
    const alreadyJoined = await user.communities.some(
      (c) => c._id === community._id
    );

    if (alreadyJoined) {
      res.status(400).json({ message: "Already joined." });
    } else {
      const communities = user.communities || [];
      user.communities = [...communities, community];

      const users = community.users || [];
      community.users = [
        ...users,
        { _id: req.user._id, userName: req.user.userName },
      ];

      await user.save();
      await community.save();

      res.status(200).json({ message: "Community joined successfully" });
    }
  } else {
    res.status(404).json({ message: "Somthing went wrong." });
  }
});

const isJoined = asyncHandler(async (req, res, next) => {
  const communityId = req.params.id;
  const userName = req.query.userName;

  if (communityId && userName) {
    const community = await Community.findById(communityId);

    if (community) {
      const isAvailable = community.users.some(
        (user) => user.userName === userName
      );

      res.json({ isAvailable });
    } else {
      res.status(404).json({ message: "Community not found." });
    }
  } else {
    res.status(404).json({ message: "Community ID or username not found." });
  }
});

export {
  createCommunity,
  getSearchedCommunities,
  getCommunityById,
  joinCommunity,
  isJoined,
};
