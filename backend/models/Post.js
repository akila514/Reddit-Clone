import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  community: {
    type: String,
    required: true,
  },

  user: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

export const Post = mongoose.model("Post", postSchema);
