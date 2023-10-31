import { useLocation, useNavigate } from "react-router-dom";
import Model from "../UI/model";
import React, { useState } from "react";
import { useLoginUserMutation } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { authActoins } from "../store/authSlice";
import { FaUserCircle } from "react-icons/fa";

const LoginScreen = ({ onBackdropClick }) => {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loginUser, { isLoading, isError }] = useLoginUserMutation();

  function handleDialogClick(event) {
    event.stopPropagation();
  }

  const onLoginClickHandler = async (event) => {
    event.preventDefault();

    const user = await loginUser({ userName, password }).unwrap();

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
