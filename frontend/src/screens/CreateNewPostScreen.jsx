import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetJoinedCommunitiesQuery } from "../store/userSlice";
import { useGetCommunityByIdQuery } from "../store/communitySlice";

const CreateNewPostScreen = () => {
  const { id } = useParams();

  const { data: community } = useGetCommunityByIdQuery(id);

  const {
    data: communities,
    isLoading,
    isError,
  } = useGetJoinedCommunitiesQuery();

  const [selectedCommunity, setSelectedCommunity] = useState(
    community ? community.name : "Select"
  );

  useEffect(() => {
    if (community) {
      setSelectedCommunity(community.name);
    }
  }, [community]);

  console.log(selectedCommunity);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const postSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <div className="max-w-xl md:min-w-[1000px] flex mx-auto text-white mt-10 flex-col p-5 rounded-md bg-[#272727]">
      <p className="font-bold">Create a Post</p>
      <hr className="mt-4 mb-8 border-[#868686]" />
      <label htmlFor="dropdown">Select a Community:</label>
      <form
        onSubmit={postSubmitHandler}
        className="rounded-lg bg-[#292929] text-white space-y-3 text-sm mt-5"
      >
        <select
          onChange={(e) => {
            setSelectedCommunity(e.target.value);
          }}
          value={selectedCommunity}
          id="dropdown"
          className="bg-transparent w-[200px] mt-2 border border-[#777777] p-2 rounded-md bg-[#272727] text-white focus:outline-none"
        >
          {communities &&
            !isLoading &&
            communities.map((c) => (
              <option key={c._id} value={c.name}>
                {c.name}
              </option>
            ))}
        </select>

        <input
          type="text"
          className="px-5 py-2 rounded-lg bg-[#3a3a3a] w-full focus:outline-none"
          placeholder="Enter Title"
        />
        <input
          type="text"
          className="px-5 py-2 rounded-lg bg-[#3a3a3a] w-full focus:outline-none"
          placeholder="Enter Description"
        />
        <button
          type="submit"
          className="w-full rounded-lg border px-3 py-1 bg-[#5a5a5a] border-[#8d8d8d]"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreateNewPostScreen;
