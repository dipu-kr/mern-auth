import React, { useState } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate("");

  const handleSubmit = async (values, { resetForm }) => {
    const { email, password } = values;
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    // console.log(data);
    if (data.status === 201) {
      localStorage.setItem("userToken", data.result.token);
      resetForm();
      toast.success("User login done ", {
        duration: 3000,
        position: "top-center",
      });
      navigate("/dash")
    }else{
      navigate("/")
    }
  };
  return (
    <div className="w-11/12 md:w-1/3 mx-auto mt-[100px] border border-gray-100 flex-col shadow-lg shadow-gray-300 p-6">
      <h1 className="text-xl md:text-2xl text-gray-600 font-bold text-center uppercase mb-6">
        Sign In
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>

            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
            />

            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <div className="w-full border border-gray-300 rounded-lg flex justify-between">
              <Field
                type={show === true ? "password" : "text"}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-[88%] px-3 py-2 border-none focus:outline-none rounded-lg"
              />
              <span
                className="w-[12%] bg-gray-100 py-2 flex justify-center items-center rounded-r-lg"
                onClick={() => setShow(!show)}
              >
                {show === true ? (
                  <BsEyeFill className="text-[21px] md:text-[25px] text-gray-500 cursor-pointer" />
                ) : (
                  <BsEyeSlashFill className="text-[21px] md:text-[25px] text-gray-500 cursor-pointer" />
                )}
              </span>
            </div>

            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-500 text-white font-bold py-2 px-4 rounded focus:outline-none hover:bg-teal-600"
          >
            Login
          </button>
          <p className="text-center text-gray-500 mt-4">
            Don't have an account?{" "}
            <span
              className="text-teal-500 underline underline-offset-2 cursor-pointer"
              onClick={() => navigate("/sign-up")}
            >
              Sign Up
            </span>
          </p>
        </Form>
      </Formik>
      <Toaster/>
    </div>
  );
};

export default Login;
