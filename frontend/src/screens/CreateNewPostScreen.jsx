import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetJoinedCommunitiesQuery } from "../store/userSlice";
import { useGetCommunityByIdQuery } from "../store/communitySlice";
import { useCreatePostMutation } from "../store/postSlice";

const CreateNewPostScreen = () => {
  const { id } = useParams();

  const { data: community } = useGetCommunityByIdQuery(id);

  const {
    data: communities,
    isLoading,
    isError,
  } = useGetJoinedCommunitiesQuery();

  const [
    createPost,
    { isLoading: isPostCreateLoading, isError: isPostCreateError },
  ] = useCreatePostMutation();

  const [selectedCommunity, setSelectedCommunity] = useState(
    community ? community.name : "Select"
  );

  useEffect(() => {
    if (community) {
      setSelectedCommunity(community.name);
    }
  }, [community]);

  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const postSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("first");
    if (selectedCommunity && title !== "" && description !== "") {
      console.log(selectedCommunity, title, description);
      try {
        const response = await createPost({
          communityId: community._id,
          title,
          description,
        });
        if (response.error) {
          console.error(response.error);
        } else if (response.data) {
          console.log(response.data);
          navigate(`/communities/${id}`);
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      console.log("Username and desc can't be empty");
    }
  };

  return (
    <div className="max-w-xl md:min-w-[1000px] flex mx-auto text-white mt-10 flex-col p-5 rounded-md bg-[#272727]">
      <p className="font-bold">Create a Post</p>
      <hr className="mt-4 mb-8 border-[#868686]" />
      <label htmlFor="dropdown" className="text-sm">
        Select a Community:
      </label>
      <form
        onSubmit={postSubmitHandler}
        className="rounded-lg bg-[#292929] text-white space-y-5 text-sm mt-5"
      >
        <select
          onChange={(e) => {
            setSelectedCommunity(e.target.value);
          }}
          value={selectedCommunity}
          id="dropdown"
          className="bg-transparent w-[200px] border border-[#777777] p-2 rounded-md bg-[#272727] text-white focus:outline-none"
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
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          className="px-5 py-2 rounded-lg bg-[#3a3a3a] w-full focus:outline-none"
          placeholder="Enter Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
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
