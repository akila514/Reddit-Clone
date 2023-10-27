import React from "react";

const Model = (props) => {
  return (
    <div
      onClick={props.onClickOnBackground}
      className="bg-[rgba(0,0,0,0.6)] z-10 fixed top-0 left-0 w-full h-full flex justify-center align-middle"
      style={{
        alignItems: "center",
      }}
    >
      {props.children}
    </div>
  );
};

export default Model;
