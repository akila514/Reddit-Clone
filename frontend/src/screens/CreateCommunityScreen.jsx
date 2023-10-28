import { useLocation, useNavigate } from "react-router-dom";
import Model from "../UI/model";
import React, { useState } from "react";
import { useLoginUserMutation } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { authActoins } from "../store/authSlice";
import { useCreateCommunityMutation } from "../store/communitySlice";

const CreateCommunityScreen = ({ onBackdropClick }) => {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();

  const [createCommunity, { isLoading, isError }] =
    useCreateCommunityMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleDialogClick(event) {
    event.stopPropagation();
  }

  const createCommunityHandler = async (event) => {
    event.preventDefault();

    try {
      const community = await createCommunity({
        name,
        description,
        profileImage: image,
      });
      console.log(community);
      onBackdropClick();
    } catch (error) {}
  };

  return (
    <>
      <Model
        onClickOnBackground={() => {
          onBackdropClick();
        }}
      >
        <form
          onSubmit={createCommunityHandler}
          className="max-w-md p-5 rounded-lg bg-[#292929] text-white space-y-3 text-sm"
          onClick={handleDialogClick}
        >
          <h2 className="text-xl font-bold">Create a Community</h2>
          <input
            type="text"
            className="px-5 py-2 rounded-lg bg-[#3a3a3a] w-full focus:outline-none"
            placeholder="Enter Community name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            className="px-5 py-2 rounded-lg bg-[#3a3a3a] w-full focus:outline-none"
            placeholder="Enter Community description"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <input
            type="text"
            className="px-5 py-2 rounded-lg bg-[#3a3a3a] w-full focus:outline-none"
            placeholder="Enter Community image"
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <button
            type="submit"
            className="w-full rounded-lg border px-3 py-1 bg-[#5a5a5a] border-[#8d8d8d]"
          >
            Create Community
          </button>
        </form>
      </Model>
    </>
  );
};

export default CreateCommunityScreen;
