import express from "express";
import {
  createCommunity,
  getCommunityById,
  getSearchedCommunities,
  isJoined,
  joinCommunity,
} from "../controller/communityController.js";
import { protect } from "../middleware/authMiddleware.js";

const communityRouter = express.Router();

communityRouter.route("/create").post(createCommunity);
communityRouter.route("/findByName").post(getSearchedCommunities);
communityRouter.route("/:id").get(getCommunityById);
communityRouter.route("/:id/join").post(protect, joinCommunity);
communityRouter.route("/:id/isjoined").get(isJoined);

export default communityRouter;
