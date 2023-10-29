import asyncHandler from "../middleware/asyncHandler.js";
import { Community } from "../models/Community.js";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

const createPost = asyncHandler(async (req, res, next) => {
  const { communityId, title, description } = req.body;

  const community = await Community.findById(communityId);
  const user = await User.findById(req.user._id);

  if (community) {
    const post = await Post.create({
      communityId,
      userId: req.user._id,
      userName: req.user.userName,
      createdAt: Date.now(),
      title,
      description,
      upVotes: 0,
      downVotes: 0,
      votedBy: [],
      comments: [],
    });

    try {
      const userPosts = user.posts;
      user.posts = [...userPosts, post];

      const communityPosts = community.posts;
      community.posts = [...communityPosts, post];

      await user.save();
      await community.save();

      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong." });
    }
  }
});

const upVotePost = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { communityId } = req.body;

  const post = await Post.findById(id);

  const userId = req.user._id;
  const user = await User.findById(userId);

  const postIndexInUser = user.posts.findIndex((p) => p._id.equals(post._id));
  const community = await Community.findById(communityId);

  const postIndexInCommunity = community.posts.findIndex((p) =>
    p._id.equals(post._id)
  );

  if (post !== null && postIndexInCommunity !== -1) {
    const votedByList = post.votedBy;
    const voteOfThisUser = votedByList.find((voteDetail) =>
      voteDetail.user._id.equals(req.user._id)
    );

    console.log(postIndexInUser);

    if (voteOfThisUser) {
      const { user, vote } = voteOfThisUser;

      if (vote === "upvote") {
        voteOfThisUser.vote = null;

        post.votedBy = votedByList.filter(
          (v) => !v.user._id.equals(req.user._id)
        );

        post.upVotes = post.upVotes - 1;
        community.posts[postIndexInCommunity] = post;

        if (postIndexInUser !== -1) {
          user.posts[postIndexInUser] = post;
        }
      }

      if (vote === "downvote") {
        voteOfThisUser = { user, vote: "upvote" };
        post.upVotes = post.upVotes + 1;
        community.posts[postIndexInCommunity] = post;

        if (postIndexInUser !== -1) {
          user.posts[postIndexInUser] = post;
        }
      }

      if (vote === null) {
        voteOfThisUser = { user, vote: "upvote" };
        post.upVotes = post.upVotes + 1;
        community.posts[postIndexInCommunity] = post;

        if (postIndexInUser !== -1) {
          user.posts[postIndexInUser] = post;
        }
      }
    } else {
      post.upVotes = post.upVotes + 1;
      post.votedBy = [...votedByList, { user: req.user, vote: "upvote" }];
      community.posts[postIndexInCommunity] = post;

      if (postIndexInUser !== -1) {
        user.posts[postIndexInUser] = post;
      }
    }

    await post.save();
    await community.save();
    await user.save();

    res.status(200).json(post);
  } else {
    res.status(404).json({ message: "Post not found.", post, community });
  }
});

const downVotePost = asyncHandler(async (req, res, next) => {});

export { createPost, upVotePost, downVotePost };
