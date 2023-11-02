import React, { useEffect,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie } from "react-icons/fa";
import {LoginContext} from "../contextProvider/Context"

const Dashboard = () => {
  const {loginData, setLoginData} = useContext(LoginContext)
  console.log(loginData)

  const navigate = useNavigate()
  const dashValid = async () => {
    const token = localStorage.getItem("userToken");
    // console.log(token);

    const res = await fetch("http://localhost:8080/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await res.json();
    if(data.status === 401){
       navigate("/*")
    }else{
      setLoginData(data)
      navigate("/dash")
    }
  };

  useEffect(() => {
    dashValid();
  }, []);
  return (
    <div className="w-full h-[calc(100vh-70px)] flex justify-center items-center flex-col">
      <div>
        <FaUserTie className="text-[90px] md:text-[120px] text-teal-500" />
      </div>
      <p className="text-[18px] md:text-[23px] font-medium mt-4 capitalize text-teal-400">
        user email : <span className="lowercase">{loginData?.data?.email}</span>
      </p>
    </div>
  );
};

export default Dashboard;
