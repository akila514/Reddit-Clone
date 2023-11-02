import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import CreateCommunityScreen from "./CreateCommunityScreen";
import {
  useGetJoinedCommunitiesQuery,
  useGetRecommendedPostsQuery,
} from "../store/userSlice";
import { useSelector } from "react-redux";
import PostTile from "../components/PostTile";

const HomeScreen = () => {
  const [isCreateCommunityOpen, setIsCreateCommunityOpen] = useState(false);

  const backdropClickHandler = () => {
    setIsCreateCommunityOpen(false);
  };

  const [recommendedPosts, setRecommendedPosts] = useState([]);

  const userInfo = useSelector((state) => state.auth.userInfo);

  const { data: posts, isLoading, isError } = useGetRecommendedPostsQuery();

  useEffect(() => {
    if (userInfo) {
      setRecommendedPosts(posts);
    }
  }, [posts]);

  return (
    <>
      {isCreateCommunityOpen && (
        <CreateCommunityScreen onBackdropClick={backdropClickHandler} />
      )}
      <div className="flex flex-col md:flex-row text-white md:px-0 max-w-screen-lg mx-auto md:space-x-10 text-sm mt-6 px-5 md">
        <div className="w-full md:w-2/3 flex flex-col">
          <input
            type="text"
            className="px-5 py-2 rounded-lg bg-[#3a3a3a] w-full focus:outline-none mb-10"
            placeholder="Create a post"
          />
          {isLoading ? (
            <p>Loading</p>
          ) : (
            <div className="flex flex-col">
              {recommendedPosts &&
                recommendedPosts.map((post) => (
                  <PostTile key={post._id} post={post} />
                ))}
            </div>
          )}
        </div>
        <div className="w-1/3 hidden md:flex h-min">
          <div className="flex  w-80 bg-[#1f1f1f] rounded-md flex-col space-y-3 pb-5 border border-[#707070]">
            <img
              className="object-cover h-[100px] rounded-t-md"
              src="https://png.pngtree.com/background/20210717/original/pngtree-elegant-clear-abstract-cosmic-wallpaper-background-picture-image_1434205.jpg"
              alt=""
            />
            <h2 className="text-[#adadad] px-4 text-sm">Home</h2>
            <h2 className="px-4">
              This is your homepage. Find your favourite posts.
            </h2>
            <>
              <hr className="border-[#707070] py-2" />
              <button className="bg-[#eeeeee] text-center rounded-2xl text-gray-800 font-bold py-1 mx-3 text-sm">
                Create a Post
              </button>
              <button
                onClick={() => {
                  setIsCreateCommunityOpen(true);
                }}
                className="bg-transparent border rounded-2xl font-bold py-1 px-3 mx-3 text-sm"
              >
                Create a Community
              </button>
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeScreen;
