import React ,{useContext} from "react";
import { useNavigate } from "react-router-dom";
import {LoginContext} from "../contextProvider/Context"

const Header = () => {
  const {loginData, setLoginData} = useContext(LoginContext)
  const navigate = useNavigate("");
  return (
    <header className="w-full bg-teal-600 px-4 md:px-2">
      <div className="max-w-7xl h-[70px] m-auto flex justify-between items-center">
        <h1 className="text-xl md:text-2xl text-white font-bold uppercase">
          mern auth
        </h1>
        {
          loginData.data && 
          <div className="flex gap-8 items-center">
              <span className="w-[35px] h-[35px] bg-white text-teal-600 rounded-full flex justify-center items-center uppercase font-bold">{loginData.data?.email.charAt(0)}</span>
              <span className="capitalize text-white text-[17px] cursor-pointer hover:underline">logout</span>
          </div>
        }
        {
          !loginData.data &&
          <ul className="block flex gap-8 text-white capitalize">
          <li
            className="list-none cursor-pointer hover:underline"
            onClick={() => navigate("/sign-up")}
          >
            sign up
          </li>
          <li
            className="list-none cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            sign in
          </li>
        </ul>
        }
      </div>
    </header>
  );
};

export default Header;
