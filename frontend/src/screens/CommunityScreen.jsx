import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaReddit, FaBell } from "react-icons/fa";
import {
  useGetCommunityByIdQuery,
  useIsJoinedQuery,
  useJoinCommunityMutation,
} from "../store/communitySlice";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

const CommunityComponent = () => {
  const { id } = useParams();
  const {
    data: community,
    isLoading,
    isError,
    refetch,
  } = useGetCommunityByIdQuery(id);

  const userInfo = useSelector((state) => state.auth.userInfo);

  const [joinCommunity, { isLoading: loadingJoin, isError: errorJoin }] =
    useJoinCommunityMutation();

  const userName = userInfo?.userName || "guest";

  const {
    data: availability,
    isLoading: loadingAvailability,
    isError: errorAvailability,
    refetch: refetchAvailability,
  } = useIsJoinedQuery({ userName, id });

  const joinCommunityHandler = async () => {
    if (!userInfo) {
      return;
    }

    await joinCommunity(id);
    refetch();
    refetchAvailability();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error occurred while fetching data.</div>;
  }

  return (
    <>
      {
        <div className="w-full">
          <div className="w-full">
            <img
              className="object-cover w-full h-32"
              src="https://cdn.shopify.com/s/files/1/0565/7080/6458/files/circles-abstract-wallpaper-mural-Living-room.jpg?v=1628738184"
              alt=""
            />
            <div className="w-full bg-[#222222] py-4 text-white">
              <div className="max-w-xl md:min-w-[1000px] flex mx-auto flex-row space-x-5">
                <FaReddit size={50} />
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    <p className="text-white flex my-auto text-2xl font-bold">
                      {community.name}
                    </p>
                    {loadingAvailability && (
                      <button className="w-full rounded-3xl border px-10 py-1 bg-[#5a5a5a] border-[#8d8d8d] ml-10 mr-4">
                        <ClipLoader
                          loading={true}
                          color="white"
                          size={20}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      </button>
                    )}
                    {!availability?.isAvailable && (
                      <button
                        onClick={joinCommunityHandler}
                        className="w-full rounded-3xl border px-10 py-1 bg-[#5a5a5a] border-[#8d8d8d] ml-10 mr-4"
                      >
                        Join
                      </button>
                    )}
                    {availability?.isAvailable && (
                      <button
                        disabled
                        className="w-full rounded-3xl border px-10 py-1 bg-[#5a5a5a] border-[#8d8d8d] ml-10 mr-4"
                      >
                        Joined
                      </button>
                    )}
                    <button className="border rounded-full p-2">
                      <FaBell size={15} />
                    </button>
                  </div>
                  <p className="text-xs text-[#b8b8b8]">r/{community.name}</p>
                </div>
              </div>
            </div>
            <div className="max-w-xl md:min-w-[1000px] flex mx-auto flex-row space-x-5 text-white mt-5">
              <div className="w-2/3">posts</div>
              <div className="w-1/3">
                <div className="flex justify-end w-80 bg-[#1f1f1f] rounded-lg flex-col space-y-3 py-5 border border-[#707070]">
                  <h2 className="text-[#adadad] px-4 text-sm">
                    About Community
                  </h2>
                  <h2 className="px-4">{community.description}</h2>
                  <div className="flex flex-col">
                    <p className="px-4 text-lg font-bold">
                      {community.users.length}
                    </p>
                    <p className="px-4 text-[#adadad] text-sm">members</p>
                  </div>

                  {userInfo && (
                    <>
                      <hr className="border-[#707070] py-2" />
                      <Link
                        to={`/communities/${community._id}/submit`}
                        className="bg-[#eeeeee] text-center rounded-2xl text-gray-800 font-bold py-1 mx-3 text-sm"
                      >
                        Create a Post
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default CommunityComponent;
