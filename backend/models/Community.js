import mongoose from "mongoose";

const communitySchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  profileImage: { type: String },
  backgroundImage: { type: String },
  users: { type: Array, required: true },
  posts: { type: Array, required: true },
});

export const Community = mongoose.model("Community", communitySchema);
