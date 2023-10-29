import React from "react";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";

const PostTile = ({ post }) => {
  return (
    <div className="flex flex-row w-full rounded-md border border-[#424242] bg-[#2e2e2e] space-y-2 my-3">
      <div className="flex flex-col py-2 px-2 bg-[#252525] rounded-l-lg">
        <TiArrowSortedUp size={30} className="text-[#969696]" />
        <TiArrowSortedDown size={30} className="text-[#969696]" />
      </div>
      <div className="flex flex-col text-white ml-4 w-full">
        <div className="flex flex-row justify-between pr-4">
          <p className="text-xs text-[#bdbdbd]">
            posted by
            <span className=" px-4 py-1 bg-[#d35400] rounded-lg ml-2 text-black">
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
