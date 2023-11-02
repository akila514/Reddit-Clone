import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserDetailsQuery,
  useGetUserPostsQuery,
} from "../store/userSlice";
import PostTile from "../components/PostTile";

const ProfilePage = () => {
  const [userDetails, setUserDetails] = useState(null);

  const {
    data: userData,
    isLoading: userDataIsLoading,
    isError: userDataHasError,
    refetch: refetchUserData,
  } = useGetUserDetailsQuery();

  useEffect(() => {
    if (userData && !userDataHasError && !userDataIsLoading) {
      setUserDetails(userData);
    }
  }, [userData]);

  return (
    <>
      {userDetails && (
        <div className="flex flex-col md:flex-row text-white md:px-0 max-w-screen-lg mx-auto md:space-x-10 text-sm mt-6">
          <div className="w-2/3 flex flex-col">
            <input
              type="text"
              className="px-5 py-2 rounded-lg bg-[#3a3a3a] w-full focus:outline-none mb-10"
              placeholder="Create a post"
            />
            {userDataIsLoading ? (
              <p>Loading</p>
            ) : (
              <div className="flex flex-col">
                {userDetails.posts &&
                  userDetails.posts.map((post) => (
                    <PostTile key={post._id} post={post} />
                  ))}
              </div>
            )}
          </div>
          <div className="w-1/3">
            <div className="relative flex justify-end w-80 bg-[#1f1f1f] rounded-md flex-col pb-5 border border-[#707070]">
              <div className="w-full h-[100px] bg-[#2D97E5]" />
              <img
                src={userData.profilePic}
                className="flex my-auto mr-2 rounded-full object-cover h-[60px] w-[60px] absolute top-14 left-2 border-2"
              />
              <h2 className="font-bold px-4 mt-8">{userData.userName}</h2>
              <h2 className="text-[#adadad] px-4 text-sm my-2">
                r/{userData.userName}
              </h2>

              <>
                <hr className="border-[#707070] py-2" />
                <button className="bg-[#eeeeee] text-center rounded-2xl text-gray-800 font-bold py-1 mx-3 text-sm">
                  Create a Post
                </button>
              </>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
