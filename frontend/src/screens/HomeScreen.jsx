import React from "react";

const HomeScreen = () => {
  return (
    <div className="flex flex-row text-white w-2/3 mx-auto mt-12">
      <div className="w-3/5 h-full flex flex-col">dsfdf</div>
      <div className="w-2/5 flex flex-col items-end">
        <div className="flex flex-col w-[200px] bg-[#202020] rounded-xl">
          <img
            className="rounded-t-xl object-cover h-[100px]"
            src="https://png.pngtree.com/background/20210717/original/pngtree-elegant-clear-abstract-cosmic-wallpaper-background-picture-image_1434205.jpg"
            alt=""
          />
          <p className="px-3 text-lg font-bold">Home</p>
          <p className="p-3 text-sm">
            Your personal Reddit frontpage. Come here to check in with your
            favorite communities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
