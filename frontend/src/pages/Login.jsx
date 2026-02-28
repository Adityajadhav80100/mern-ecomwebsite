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
    <section className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-gray-200">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500">
              Login to continue shopping.
            </p>
          </div>

          <form onSubmit={handlesubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Your email
              </label>
              <input
                value={form.email}
                onChange={handlechanges}
                name="email"
                type="email"
                id="email"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
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
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            <div className="flex items-center gap-3 text-sm text-gray-500">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 rounded border border-gray-300 bg-white focus:ring-blue-500"
                required
              />
              <label htmlFor="terms" className="font-light">
                I accept the{" "}
                <span className="font-semibold text-blue-600">
                  Terms and Conditions
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-center text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-blue-600 hover:underline"
              >
                Signup here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login
