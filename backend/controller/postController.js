import asyncHandler from "../middleware/asyncHandler.js";
import { Community } from "../models/Community.js";
import { Post } from "../models/Post.js";
import { User } from "../models/User.js";

const createPost = asyncHandler(async (req, res, next) => {
  const { communityId, title, description, postImg } = req.body;

  console.log(postImg);

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
      postImg,
      upVotes: 0,
      downVotes: 0,
      votedBy: [],
      comments: [],
    });

    console.log(post);

    try {
      const userPosts = user.posts;
      user.posts = [...userPosts, post];

      const communityPosts = community.posts;
      community.posts = [...communityPosts, post];

      user.markModified("posts");
      community.markModified("posts");

      await user.save();
      await community.save();

      res.status(201).json(post);
    } catch (error) {
      res.status(400).json({ message: "Something went wrong." });
    }
  }
});

const findPostById = asyncHandler(async (req, res, next) => {
  const postId = req.params.id;

  try {
    const post = await Post.findById(postId);
    res.status(200).json(post);
  } catch (error) {}
});

const postComment = asyncHandler(async (req, res, next) => {
  const { comment } = req.body;

  const postId = req.params.id;
  const post = await Post.findById(postId);

  const community = await Community.findById(post.communityId);

  const postIndexInCommunityPosts = community.posts.findIndex((p) =>
    p._id.equals(postId)
  );

  const ownerId = post.userId;

  const owner = await User.findById(ownerId);

  console.log(owner);

  const postIndexInOwnersPost = owner.posts.findIndex((p) =>
    p._id.equals(postId)
  );

  const commentObj = {
    userId: req.user._id,
    userName: req.user.userName,
    comment,
  };

  post.comments.push(commentObj);

  community.posts[postIndexInCommunityPosts].comments.push(commentObj);

  owner.posts[postIndexInOwnersPost].comments.push(commentObj);

  post.markModified("comments");
  community.markModified("posts");
  owner.markModified("posts");

  res.status(200).json(post);

  await community.save();
  await owner.save();
  await post.save();
});

const upVotePost = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { communityId } = req.body;

  const post = await Post.findById(id);

  const community = await Community.findById(communityId);

  let userVote = post.votedBy.find((v) => v.userId.equals(req.user._id));

  const postOwner = await User.findById(post.userId);

  const userVoteIndex = post.votedBy.findIndex((v) =>
    v.userId.equals(req.user._id)
  );

  if (userVote && userVoteIndex != -1) {
    const tempVote = userVote.vote;

    if (tempVote == "downvote") {
      userVote.vote = "upvote";
      post.votedBy[userVoteIndex] = userVote;
      post.upVotes++;

      if (post.downVotes > 0) {
        post.downVotes--;
      }
    }

    if (tempVote == "upvote") {
      userVote.vote = "none";
      post.votedBy[userVoteIndex] = userVote;
      post.upVotes--;
    }

    if (tempVote == "none") {
      userVote.vote = "upvote";
      post.votedBy[userVoteIndex] = userVote;
      post.upVotes++;
    }
  } else {
    userVote = { userId: req.user._id, vote: "upvote" };
    post.upVotes++;
    post.votedBy.push(userVote);
  }

  const postIndexInCommunity = community.posts.findIndex((c) =>
    c._id.equals(id)
  );

  const postIndexInOwner = postOwner.posts.findIndex((p) => p._id.equals(id));

  community.posts[postIndexInCommunity] = post;
  postOwner.posts[postIndexInOwner] = post;

  postOwner.markModified("posts");

  await postOwner.save();
  await post.save();
  await community.save();

  res.status(200).json(post);
});

const downVotePost = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { communityId } = req.body;

  const post = await Post.findById(id);

  const community = await Community.findById(communityId);

  let userVote = post.votedBy.find((v) => v.userId.equals(req.user._id));

  const userVoteIndex = post.votedBy.findIndex((v) =>
    v.userId.equals(req.user._id)
  );

  if (userVote && userVoteIndex != -1) {
    const tempVote = userVote.vote;

    if (tempVote == "upvote") {
      userVote.vote = "downvote";
      post.votedBy[userVoteIndex] = userVote;
      post.downVotes++;

      if (post.upVotes > 0) {
        post.upVotes--;
      }
    }

    if (tempVote == "downvote") {
      userVote.vote = "none";
      post.votedBy[userVoteIndex] = userVote;
      post.downVotes--;
    }

    if (tempVote == "none") {
      userVote.vote = "downvote";
      post.votedBy[userVoteIndex] = userVote;
      post.downVotes++;
    }
  } else {
    userVote = { userId: req.user._id, vote: "downvote" };
    post.downVotes++;
    post.votedBy.push(userVote);
  }

  const postIndexInCommunity = community.posts.findIndex((c) =>
    c._id.equals(id)
  );

  community.posts[postIndexInCommunity] = post;

  await post.save();
  await community.save();

  res.status(200).json(post);
});

export { createPost, upVotePost, downVotePost, findPostById, postComment };
