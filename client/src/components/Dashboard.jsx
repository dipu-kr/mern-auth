import React from "react";
import { FaUserTie } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="w-full h-[calc(100vh-70px)] flex justify-center items-center flex-col">
      <div>
        <FaUserTie className="text-[90px] md:text-[120px] text-teal-500" />
      </div>
      <p className="text-[18px] md:text-[23px] font-medium mt-4 capitalize text-teal-400">
        user email : <span className="lowercase">user@gmail.com</span>
      </p>
    </div>
  );
};

export default Dashboard;
