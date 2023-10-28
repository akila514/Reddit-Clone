import express from "express";
import { createCommunity } from "../controller/communityController.js";

const communityRouter = express.Router();

communityRouter.route("/create").post(createCommunity);

export default communityRouter;
