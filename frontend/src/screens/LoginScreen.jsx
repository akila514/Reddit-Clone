import { useLocation, useNavigate } from "react-router-dom";
import Model from "../UI/model";
import React, { useState } from "react";
import { useLoginUserMutation } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { authActoins } from "../store/authSlice";
import { FaUserCircle } from "react-icons/fa";
import { uploadImage } from "../util/uploadImage";

const LoginScreen = ({ onBackdropClick }) => {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loginUser, { isLoading, isError }] = useLoginUserMutation();

  const handleChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  function handleDialogClick(event) {
    event.stopPropagation();
  }

  const onLoginClickHandler = async (event) => {
    event.preventDefault();

    const downloadURL = await uploadImage(selectedImage);

    const user = await loginUser({ userName, password, downloadURL }).unwrap();

    if (user) {
      dispatch(authActoins.setCredentials({ ...user }));

      onBackdropClick();
    }
  };

  const onSignupHandler = () => {
    onBackdropClick();
    navigate("/signup");
  };

  return (
    <>
      <Model
        onClickOnBackground={() => {
          onBackdropClick();
        }}
      >
        <form
          onSubmit={onLoginClickHandler}
          className="max-w-sm p-5 rounded-lg bg-[#292929] text-white space-y-5 text-sm"
          onClick={handleDialogClick}
        >
          <h2 className="text-xl font-bold">Login</h2>
          <FaUserCircle
            className="flex my-5 mx-auto text-[#b4b4b4]"
            size={100}
          />
          <p className="text-center font-bold">Select Image</p>
          <input
            onChange={handleChange}
            id="image"
            type="file"
            className="bg-[#1a1a1a] p-2 rounded flex mx-auto"
            placeholder="Select image from storage"
          />
          <input
            type="text"
            className="px-5 py-2 rounded-lg bg-[#3a3a3a] w-full focus:outline-none"
            placeholder="Enter Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          <input
            type="text"
            className="px-5 py-2 rounded-lg bg-[#3a3a3a] w-full focus:outline-none"
            placeholder="Enter Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button
            type="submit"
            className="w-full rounded-lg border px-3 py-1 bg-[#5a5a5a] border-[#8d8d8d]"
          >
            Login
          </button>
          <div className="pt-5 flex flex-row space-x-2">
            <p>Dont have an account?</p>
            <button
              type="button"
              onClick={onSignupHandler}
              className="text-[#d35400]"
            >
              Sign up
            </button>
          </div>
        </form>
      </Model>
    </>
  );
};

export default LoginScreen;
