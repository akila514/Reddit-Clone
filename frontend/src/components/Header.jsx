import React, { useState } from "react";
import { FaUser, FaBars, FaPlus, FaChevronDown } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import logo from "../assets/reddit.png";
import { Link } from "react-router-dom";
import LoginScreen from "../screens/LoginScreen";

const Navbar = () => {
  const [isLoginOpen, setInLoginOpen] = useState(false);

  const onLoginClickHandler = () => {
    setInLoginOpen(!isLoginOpen);
  };

  const backdropClickHandler = () => {
    setInLoginOpen(false);
  };

  return (
    <>
      {isLoginOpen && <LoginScreen onBackdropClick={backdropClickHandler} />}
      <nav className="bg-[#1A1A1B] w-full py-1 px-5 text-[#D7DADC] flex flex-row justify-between items-center overflow-x-hidden">
        <div className="flex flex-row space-x-2">
          {/* Logo */}
          <img
            src={logo}
            alt=""
            className="w-8 h-8 rounded-full flex my-auto"
          />
          {/* NavLink */}
          <a href="/" className="text-2xl my-auto pr-8">
            reddit
          </a>
          {/* Home Dropdown */}
          {/* Consider using a library for better dropdown experience */}
          <div className="hidden md:flex border justify-between border-[#1A1A1B] hover:border-[#666666] duration-200 hover:cursor-pointer md:w-[200px] rounded-md py-1 px-3 flex-row space-x-2">
            <div className="flex flex-row">
              <AiFillHome className="flex my-auto mr-2" size={20} />
              <p className="text-[16px] mt-1">Home</p>
            </div>
            <FaChevronDown className="text-[16px] flex my-auto" />
          </div>
        </div>
        <input
          className="hidden md:flex flex-grow h-9 px-5 ml-5 focus:outline-none bg-[#2e2e2e] border border-[#5c5c5c] rounded-3xl"
          placeholder="Search Reddit"
        />
        <div className="flex flex-row space-x-5 items-center action-buttons ml-5">
          {/* Plus Icon */}
          <FaPlus className="text-[16px] flex my-auto" />
          {/* Hamburger menu Icon */}
          <FaBars className="text-[16px] flex md:hidden" />
          {/* My Profile Dropdown */}
          {/* Consider using a library for better dropdown experience */}
          <div
            onClick={onLoginClickHandler}
            className="hidden md:flex border justify-between border-[#1A1A1B] hover:border-[#666666] duration-200 hover:cursor-pointer md:w-[150px] rounded-md py-1 px-3 flex-row space-x-2"
          >
            <div className="flex flex-row">
              <FaUser className="flex my-auto mr-2" size={20} />
              <p className="text-[16px] mt-1">Login</p>
            </div>
            <FaChevronDown className="text-[16px] flex my-auto" />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
