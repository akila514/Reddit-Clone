import express from "express";
import {
  createCommunity,
  getSearchedCommunities,
} from "../controller/communityController.js";

const communityRouter = express.Router();

communityRouter.route("/create").post(createCommunity);
communityRouter.route("/findByName").post(getSearchedCommunities);

export default communityRouter;
