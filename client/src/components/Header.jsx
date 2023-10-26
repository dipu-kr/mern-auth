import React from "react";

const Header = () => {
  return (
    <header className="w-full bg-teal-600 px-4 md:px-0">
      <div className="max-w-7xl h-[70px] m-auto flex justify-between items-center">
        <h1 className="text-xl md:text-2xl text-white font-bold uppercase">
          mern auth
        </h1>
        <ul className="block flex gap-8 text-white capitalize">
          <li className="list-none cursor-pointer hover:underline">sign up</li>
          <li className="list-none cursor-pointer hover:underline">sign in</li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
