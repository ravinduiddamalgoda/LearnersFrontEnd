import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginUser() {
  const Navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
    role: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  
  // const [, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    console.log(e);
    // e.preventDefault();
    // setFormErrors(validate(formValues));
    // setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  return (
    <div class="h-100">
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-40 ">
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">Logged in successfully</span>
          </div>
        ) : (
          <p className="text-red-500"></p>
        )}

        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4 flex justify-center">
            Sign in
          </h1>
          <div className="flex justify-between">
            <button
              type="button"
              className="text-sky-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out"
              onClick={(formValues.role = "student")}
            >
              Student
            </button>
            <button
              type="button"
              className="text-sky-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out"
              onClick={(formValues.role = "instructor")}
            >
              Instructor
            </button>
            <button
              type="button"
              className="text-sky-500 hover:bg-blue-700 hover:text-white font-bold py-2 px-4 rounded mt-4 transition duration-300 ease-in-out"
              onClick={(formValues.role = "admin")}
            >
              Admin
            </button>
          </div>

          <div className="border-b border-gray-300 mb-4 mt-4"></div>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formValues.username}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
              <p className="text-red-500">{formErrors.username}</p>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-semibold mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formValues.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
              <p className="text-red-500">{formErrors.password}</p>
            </div>
          </div>
          <button
            type={"submit"}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Login
          </button>
        </form>
        <div className="text mt-4">
          Don't have an account?{" "}
          <span className="text-blue-500" onClick={() => Navigate("/register")}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}

export default LoginUser;
