import React from "react";

const Error = () => {
  return (
    <div className="w-full h-[calc(100vh-70px)] flex justify-center items-center flex-col">
      <h2 className="text-[25px] md:text-[40px] font-medium text-red-500">404</h2>
      <p className="text-[25px] md:text-[40px] font-medium text-red-500">Page not found</p>
    </div>
  );
};

export default Error;
