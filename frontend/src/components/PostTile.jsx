import React, { useState } from "react";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import {
  useDownvotePostMutation,
  useUpvotePostMutation,
} from "../store/postSlice";
import ClipLoader from "react-spinners/ClipLoader";
import { FaComment } from "react-icons/fa";
import { Link } from "react-router-dom";

const PostTile = ({ post }) => {
  const [upvotePost, { isLoading, isError }] = useUpvotePostMutation();
  const [downvotePost] = useDownvotePostMutation();

  const [votes, setVotes] = useState(post.upVotes - post.downVotes);

  const onUpVoteHandler = async () => {
    try {
      const obj = await upvotePost({
        communityId: post.communityId,
        postId: post._id,
      });

      setVotes(obj.data.upVotes - obj.data.downVotes);
    } catch (error) {
      console.log("Something went wrong.");
    }
  };

  const onDownVoteHandler = async () => {
    try {
      const obj = await downvotePost({
        communityId: post.communityId,
        postId: post._id,
      });

      setVotes(obj.data.upVotes - obj.data.downVotes);
    } catch (error) {
      console.log("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-row w-full rounded-md border border-[#424242] bg-[#2e2e2e] space-y-2 mb-3 hover:border-[#a3a3a3] duration-100">
      <div className="flex flex-col px-2 bg-[#252525] rounded-l-lg">
        <TiArrowSortedUp
          onClick={!isLoading ? onUpVoteHandler : () => {}}
          size={30}
          className="text-[#969696] hover:cursor-pointer"
        />
        <p className="flex mx-auto text-lg">{votes}</p>
        <TiArrowSortedDown
          onClick={onDownVoteHandler}
          size={30}
          className="text-[#969696] hover:cursor-pointer"
        />
      </div>
      <Link
        to={`/communities/${post.communityId}/posts/${post._id}`}
        className="flex flex-col text-white ml-4 w-full hover:cursor-pointer"
      >
        <div className="flex flex-row justify-between pr-4">
          <p className="text-xs text-[#bdbdbd]">
            posted by
            <span className="ml-1">{post.userName}</span>
          </p>
          <p className="text-xs text-[#bdbdbd]">at {post.createdAt}</p>
        </div>
        <p className="font-bold mt-2 text-lg">{post.title}</p>
        <p className="text-sm py-2 my-2 rounded-lg text-[#c2c2c2]">
          {post.description}
        </p>
        {post.postImg && (
          <img
            src={post.postImg}
            className="object-cover h-[350px] w-full pr-4 mb-4"
          />
        )}
        <button className="text-xs text-[#bebebe] font-bold text-left mb-4">
          <div className="flex flex-row">
            <FaComment className="flex my-auto mr-1" /> {post.comments.length}
            <p className="ml-1">Comments</p>
          </div>
        </button>
      </Link>
    </div>
  );
};

export default PostTile;
