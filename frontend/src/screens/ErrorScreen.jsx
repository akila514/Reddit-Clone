import React from "react";
import Header from "../components/Header";

const ErrorScreen = () => {
  return (
    <div>
      <Header />
      <p className="font-bold text-xl text-center mt-10">Page not found.</p>
      <p className="text-center mt-5">
        The page you are looking for in not available or been deleted. Please
        try again later.
      </p>
    </div>
  );
};

export default ErrorScreen;
