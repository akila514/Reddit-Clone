import React, { useState } from "react";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import {
  useDownvotePostMutation,
  useUpvotePostMutation,
} from "../store/postSlice";
import ClipLoader from "react-spinners/ClipLoader";

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
    <div className="flex flex-row w-full rounded-md border border-[#424242] bg-[#2e2e2e] space-y-2 mb-3">
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
          className="text-[#969696]"
        />
      </div>
      <div className="flex flex-col text-white ml-4 w-full">
        <div className="flex flex-row justify-between pr-4">
          <p className="text-xs text-[#bdbdbd]">
            posted by
            <span className=" px-4 py-1 bg-[#5b81ff] rounded-lg ml-2 text-black">
              {post.userName}
            </span>
          </p>
          <p className="text-xs text-[#bdbdbd]">at {post.createdAt}</p>
        </div>
        <p className="font-bold mt-2 text-lg">{post.title}</p>
        <p className="text-sm py-2 my-2 rounded-lg">{post.description}</p>
      </div>
    </div>
  );
};

export default PostTile;
