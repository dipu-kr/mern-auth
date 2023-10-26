import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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
  const handleSubmit = (values) => {
    // You can handle the form submission here (e.g., sending a request to your server).
    console.log("Form values:", values);
  };
  return (
    <div className="w-11/12 md:w-1/3 mx-auto mt-[100px] border border-gray-100 flex-col shadow-lg shadow-gray-300 p-6">
      <h1 className="text-xl md:text-2xl text-gray-600 font-bold text-center uppercase mb-6">
        Login
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-teal-300 focus:border-teal-300"
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
            <div className="w-full border rounded-lg focus:outline-none focus:ring focus:ring-teal-300 focus:border-teal-300">
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="w-[90%] px-3 py-2"
              />
              <span className="w-[10%]">show</span>
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
            <span className="text-teal-500 hover:underline cursor-pointer">
              Sign Up
            </span>
          </p>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
