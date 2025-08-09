import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <ClipLoader size={50} color="#9d97ab" />
    </div>
  );
};

export default Loader;
