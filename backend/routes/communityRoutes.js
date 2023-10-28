import express from "express";
import {
  createCommunity,
  getCommunityById,
  getSearchedCommunities,
} from "../controller/communityController.js";

const communityRouter = express.Router();

communityRouter.route("/create").post(createCommunity);
communityRouter.route("/findByName").post(getSearchedCommunities);
communityRouter.route("/:id").get(getCommunityById);

export default communityRouter;
