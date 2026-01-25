import React from 'react'
import { Link, useNavigate } from "react-router-dom";

import { useState } from 'react'
// import { useNavigate } from 'react-router'
import { api } from '../api/axios'

function Login() {

  const navigate = useNavigate();
  const [form, setform] = useState({
    email: "",
    password: ""
  })

  const handlechanges = (e) => {
    setform({
      ...form, [e.target.name]: e.target.value
    });
  }
  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", form);

      localStorage.setItem("token", response.data.token);
      const userId =
        response.data.user?._id ||
        response.data.userId ||
        response.data._id;

      if (!userId) {
        console.error("User ID missing in login response", response.data);
        return;
      }

      localStorage.setItem("userId", userId);
      localStorage.setItem("token", response.data.token);

      window.dispatchEvent(new Event("authChanged"));
      navigate("/");


      window.dispatchEvent(new Event("authChanged"));
      navigate("/");
    } catch (err) {
      console.log("login error", err);
    }
  };


  return (

    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">


          <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Login
              </h1>

              <form onSubmit={handlesubmit} className="space-y-4 md:space-y-6">


                {/* email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    value={form.email}
                    onChange={handlechanges}
                    name="email"
                    type="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="name@company.com"
                    required
                  />
                </div>

                {/*Passwords  */}
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    value={form.password}
                    name="password"
                    onChange={handlechanges}
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                  />
                </div>



                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="terms"
                      className="font-light text-gray-500 dark:text-gray-300"
                    >
                      I accept the{" "}
                      <a
                        href="#"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-800"
                >
                  Login
                </button>

                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    signup here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>

  )
}

export default Login
