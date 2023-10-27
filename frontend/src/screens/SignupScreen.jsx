import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../store/userSlice";

const SignupScreen = () => {
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const [login, { isLoading, isError }] = useRegisterUserMutation();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();

    if (password == confirmPassword) {
      try {
        const user = await login({ userName, email, password }).unwrap();
        navigate("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="max-w-xl flex mx-auto flex-col mt-10 p-5 rounded-lg bg-[#292929] text-white space-y-3 text-sm"
    >
      <h2 className="text-xl font-bold">Signup</h2>
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
        placeholder="Enter Email"
        onChange={(e) => {
          setEmail(e.target.value);
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
      <input
        type="text"
        className="px-5 py-2 rounded-lg bg-[#3a3a3a] w-full focus:outline-none"
        placeholder="Confirm Password"
        onChange={(e) => {
          setConfirmPassword(e.target.value);
        }}
      />
      <button
        type="submit"
        className="w-full rounded-lg border px-3 py-1 bg-[#5a5a5a] border-[#8d8d8d]"
      >
        Signup
      </button>
    </form>
  );
};

export default SignupScreen;
