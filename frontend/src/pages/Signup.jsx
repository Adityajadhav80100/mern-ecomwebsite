import React from 'react'
import { api } from '../api/axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function Signup() {
   const [form, setform] = useState({
    name:"",
    email:"",
    password:""
   })
  
 const handlechanges = (e)=>{
    setform({
        ...form , [e.target.name]:e.target.value
    });
 }
 
 
 const handlesubmit = async (e)=>{
     e.preventDefault()
    try{ 
     const response = await api.post("/auth/signup" ,  form)
     console.log(response)
     setform({
     name:"",
    email:"",
    password:""
    }) 


    }catch(err){
     console.log(err , " error occure")
    }
 }
  return (
    <section className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl border border-gray-200">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">
              Create your account
            </h1>
            <p className="text-sm text-gray-500">
              Join us to explore great products.
            </p>
          </div>

          <form onSubmit={handlesubmit} className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700"
              >
                Full name
              </label>
              <input
                value={form.name}
                onChange={handlechanges}
                name="name"
                type="text"
                id="name"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="Enter your full name"
                required
              />
            </div>

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
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="••••••••"
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
              className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-700"
            >
              Create an account
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:underline"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signup
