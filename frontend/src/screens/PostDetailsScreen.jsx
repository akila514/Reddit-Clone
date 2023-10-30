import React from "react";
import { useGetCommunityByIdQuery } from "../store/communitySlice";
import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../store/postSlice";
import { FaComment, FaReddit } from "react-icons/fa";

const PostDetailsScreen = () => {
  const { id } = useParams();
  const { postid } = useParams();

  const {
    data: community,
    isLoading,
    isError,
    refetch,
  } = useGetCommunityByIdQuery(id);

  const {
    data: post,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useGetPostByIdQuery(postid);

  return (
    <>
      {community && post && (
        <div className="flex flex-col md:flex-row text-white md:px-0 max-w-screen-lg mx-auto md:space-x-10 text-sm mt-6">
          <div className="w-2/3 flex flex-col bg-[#1f1f1f] p-5 rounded-lg h-full">
            <p className="flex flex-row space-x-1 text-xs text-[#8a8a8a]">
              <span>
                <FaReddit
                  className="flex my-auto text-[#eeeeee] mr-1"
                  size={20}
                />
              </span>
              <span className="text-white font-bold flex my-auto pr-2">
                {community.name}
              </span>
              posted by {post.userName} at {post.createdAt}
            </p>
            <h1 className="text-xl font-bold mt-4">{post.title}</h1>
            <p className="text-sm mt-8 text-[#c5c5c5]">{post.description}</p>
            <button className="text-xs text-[#bebebe] font-bold text-left mb-2 mt-5">
              <div className="flex flex-row">
                <FaComment className="flex my-auto mr-1" />{" "}
                {post.comments.length}
                <p className="ml-1">Comments</p>
              </div>
            </button>
            <textarea
              className="bg-transparent border border-[#919191] rounded-t-md w-full mt-10 p-5 h-[200px] focus:outline-none text-left align-top"
              placeholder="What are your thoughts?"
              rows="3"
            />
            <div className="w-full bg-[#313131] rounded-b-md py-2 justify-end flex">
              <button className="bg-[#eeeeee] rounded-2xl text-gray-800 font-bold py-1 px-3 mx-3 text-sm">
                Comment
              </button>
            </div>
          </div>
          <div className="w-1/3 flex">
            <div className="flex py-5 w-80 bg-[#1f1f1f] rounded-lg flex-col space-y-1 pb-5 border border-[#707070] h-min">
              <p className="px-8 pb-5">{community.name}</p>
              <hr className="border-[#5f5f5f] pb-2" />
              <p className="px-8 pb-2 text-sm">{community.description}</p>
              <p className="px-8 text-lg font-bold">{community.users.length}</p>
              <p className="px-8 text-xs">Members</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetailsScreen;
