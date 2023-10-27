import { Link, useLocation, useNavigate } from "react-router-dom";
import Model from "../UI/model";
import React from "react";

const LoginScreen = ({ onBackdropClick, onSignUp }) => {
  function handleDialogClick(event) {
    event.stopPropagation();
  }

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const navigate = useNavigate();

  const onSignupClick = () => {
    onSignUp();
    navigate(redirect ? `signup?redirect=${redirect}` : "/");
  };

  return (
    <>
      <Model
        onClickOnBackground={() => {
          onBackdropClick();
        }}
      >
        <form
          className="max-w-md p-5 rounded-lg bg-[#292929] text-white space-y-3 text-sm"
          onClick={handleDialogClick}
        >
          <h2 className="text-xl font-bold">Login</h2>
          <input
            type="text"
            className="px-5 py-2 rounded-lg bg-[#3a3a3a] w-full focus:outline-none"
            placeholder="Enter Username"
          />
          <input
            type="text"
            className="px-5 py-2 rounded-lg bg-[#3a3a3a] w-full focus:outline-none"
            placeholder="Enter Password"
          />
          <button className="w-full rounded-lg border px-3 py-1 bg-[#5a5a5a] border-[#8d8d8d]">
            Login
          </button>
          <div className="pt-5 flex flex-row space-x-2">
            <p>Dont have an account?</p>
            <button className="text-[#d35400]" onClick={onSignupClick}>
              Sign up
            </button>
          </div>
        </form>
      </Model>
    </>
  );
};

export default LoginScreen;
