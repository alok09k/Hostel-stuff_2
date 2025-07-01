import React from 'react';
import { X, Mail, Lock } from 'lucide-react';
import { useContext } from "react";
import { AppContext } from "./AppContext";
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect } from 'react';




const Login = () => {

  const { setShowAuth, setShowLogin,userDetails,setUserDetails,apiUrl } = useContext(AppContext);
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `${apiUrl}/login`;
    axios.post(URL, formData)
      .then((res) => {

        toast.success(res.data.message);
        if (res.data.token) {
          // Save both token and name in localStorage
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('username', res.data.name); 
          localStorage.setItem('userId',res.data.userId)
          setUserDetails(res.data.name); 
          setShowAuth(false)
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response?.data?.message || 'Something went wrong!');
      });
  };


  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 z-10 background-blur-sm bg-black/30 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm relative">
        {/* Close button */}
        <button className="absolute right-4 top-4" onClick={() => setShowAuth(false)} >
          <X className="h-4 w-4 text-gray-400" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Login</h1>
          <p className="text-gray-600 mt-2">Welcome back! Please sign in to continue</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name='Email'
              placeholder="Email id"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              name='Password'
              placeholder="Password"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.Password}
              onChange={handleChange}
            />
          </div>

          {/* Forgot Password Link */}
          <div className="text-right">
            <a href="#" className="text-blue-600 text-sm hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Create Account Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Submit
          </button>

          {/* Sign Up Link */}
          <div className="text-center text-gray-600 text-sm">
            Don't have an account?{' '}
            <a className="text-blue-600 hover:underline" onClick={() => setShowLogin(false)}>
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
