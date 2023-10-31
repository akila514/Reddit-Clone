import { useLocation, useNavigate } from "react-router-dom";
import Model from "../UI/model";
import React, { useState } from "react";
import { useLoginUserMutation } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { authActoins } from "../store/authSlice";
import { useCreateCommunityMutation } from "../store/communitySlice";
import { uploadImage } from "../util/uploadImage";

const CreateCommunityScreen = ({ onBackdropClick }) => {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [createCommunity, { isLoading, isError }] =
    useCreateCommunityMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  function handleDialogClick(event) {
    event.stopPropagation();
  }

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleBackgroundImage = (event) => {
    setImage(event.target.files[0]);
  };

  const createCommunityHandler = async (event) => {
    event.preventDefault();

    let downloadURL;
    let downloadURLBackground;

    if (selectedImage) {
      downloadURL = await uploadImage(selectedImage);
    }
    if (image) {
      downloadURLBackground = await uploadImage(image);
    }

    try {
      const community = await createCommunity({
        name,
        description,
        profileImage: downloadURL || null,
        backgroundImage: downloadURLBackground || null,
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
          className="max-w-md rounded-lg bg-[#292929] text-white text-sm"
          onClick={handleDialogClick}
        >
          <h2 className="text-xl font-bold px-5 py-3">Create a Community</h2>
          <hr className="py-3 border-[#5a5a5a]" />
          <div className="felx flex-col px-5 space-y-5">
            <p className="text-center font-bold">
              Select community profile image
            </p>
            <input
              onChange={handleChange}
              id="image"
              type="file"
              className="bg-[#1a1a1a] p-2 rounded flex mx-auto"
              placeholder="Select image from storage"
            />
            <p className="text-center font-bold">
              Select community background image
            </p>
            <input
              onChange={handleBackgroundImage}
              id="image"
              type="file"
              className="bg-[#1a1a1a] p-2 rounded flex mx-auto"
              placeholder="Select image from storage"
            />
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
          </div>
          <div className="flex flex-row space-x-5 py-5 mt-5 px-5 rounded-b-lg bg-[#3a3a3a]">
            <button
              type="button"
              onClick={() => {
                onBackdropClick();
              }}
              className="w-full rounded-3xl border px-3 py-2 bg-[#5a5a5a] border-[#8d8d8d] font-bold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full font-bold rounded-3xl border px-3 py-2 bg-[#d6d6d6] text-gray-900 border-[#353535]"
            >
              Create Community
            </button>
          </div>
        </form>
      </Model>
    </>
  );
};

export default CreateCommunityScreen;
