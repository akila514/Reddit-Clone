import React from "react";
import { FaUser } from "react-icons/fa";

const HomeScreen = () => {
  return (
    <div className="flex flex-col md:flex-row text-white md:px-0 max-w-screen-lg mx-auto md:space-x-10 text-sm mt-6">
      <div className="w-2/3 flex flex-col">
        <input
          type="text"
          className="px-5 py-2 rounded-lg bg-[#3a3a3a] w-full focus:outline-none"
          placeholder="Create a post"
        />
      </div>
      <div className="w-1/3 flex justify-end items-end">
        <div className="flex justify-end w-80 bg-[#1f1f1f] rounded-lg flex-col space-y-3 pb-5 border border-[#707070]">
          <img
            className="object-cover h-[80px] rounded-t-lg"
            src="https://png.pngtree.com/background/20210717/original/pngtree-elegant-clear-abstract-cosmic-wallpaper-background-picture-image_1434205.jpg"
            alt=""
          />
          <h2 className="font-bold px-4">Home</h2>
          <p className="px-4">
            Your personal Reddit frontpage. Come here to check in with your
            favorite communities.
          </p>
          <button className="bg-[#eeeeee] rounded-2xl text-gray-800 font-bold py-1 px-3 mx-3 text-sm">
            Create a Post
          </button>
          <button className="bg-transparent border rounded-2xl font-bold py-1 px-3 mx-3 text-sm">
            Create a Community
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
