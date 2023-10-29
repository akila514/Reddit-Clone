import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  communityId: {
    type: String,
    required: true,
  },

  userId: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
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
