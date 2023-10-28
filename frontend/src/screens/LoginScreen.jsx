import { Link, useNavigate } from "react-router-dom";
import Model from "../UI/model";
import React, { useState } from "react";
import { useLoginUserMutation } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { authActoins } from "../store/authSlice";

const LoginScreen = ({ onBackdropClick }) => {
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [loginUser, { isLoading, isError }] = useLoginUserMutation();

  function handleDialogClick(event) {
    event.stopPropagation();
  }

  const onLoginClickHandler = async () => {
    console.log(userName, password);
    const user = await loginUser({ userName, password }).unwrap();
    dispatch(authActoins.setCredentials({ ...user }));
    console.log(user);
    navigate("/");
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
          className="max-w-sm p-5 rounded-lg bg-[#292929] text-white space-y-3 text-sm"
          onClick={handleDialogClick}
        >
          <h2 className="text-xl font-bold">Login</h2>
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
            onClick={onLoginClickHandler}
            className="w-full rounded-lg border px-3 py-1 bg-[#5a5a5a] border-[#8d8d8d]"
          >
            Login
          </button>
          <div className="pt-5 flex flex-row space-x-2">
            <p>Dont have an account?</p>
            <button onClick={onSignupHandler} className="text-[#d35400]">
              Sign up
            </button>
          </div>
        </form>
      </Model>
    </>
  );
};

export default LoginScreen;
