import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  profilePic: { type: String },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  posts: { type: Array, required: true },
  communities: { type: Array, required: true },
});

export const User = mongoose.model("User", userSchema);
