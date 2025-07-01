import React, { useState, useContext } from "react";
import { User, Mail, Lock, X } from "lucide-react";
import { AppContext } from "./AppContext";
import Login from "./Login";
import axios from "axios";
import toast from "react-hot-toast";


const SignUp = () => {
  const { setShowAuth, showLogin, setShowLogin,apiUrl} = useContext(AppContext);

  // Form state
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });

  // Error state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = `${apiUrl}/signup`;
    axios.post(URL,formData)
    .then((res) => {
      console.log(res);
      toast.success(res.data.message);
    })
    .catch((err) => {
      console.log(err);
      // Handling error properly with err.response.data
      toast.error(err.response?.data?.message || 'Something went wrong!');
    });
  };
  

  return (
    <>
      {showLogin ? (
        <Login />
      ) : (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-10 background-blur-sm bg-black/30 flex justify-center items-center">
          <div className="relative bg-white rounded-lg shadow-lg p-8 w-96">
            {/* Close button */}
            <button
              className="absolute right-4 top-4"
              onClick={() => setShowAuth(false)}
            >
              <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
            </button>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">Sign Up</h2>
              <p className="text-gray-600 mt-1">
                Create your account to get started!
              </p>
            </div>


            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="relative">
                  <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    name="Name"
                    placeholder="Full Name"
                    value={formData.Name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="email"
                    name="Email"
                    placeholder="Email ID"
                    value={formData.Email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="password"
                    name="Password"
                    placeholder="Password"
                    value={formData.Password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="text-left">
                <a href="#" className="text-blue-500 text-sm hover:underline">
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Create Acount
              </button>

              <div className="text-center text-gray-600 text-sm">
                <p>
                  Already have an account?{" "}
                  <a
                    className="text-blue-500 hover:underline cursor-pointer"
                    onClick={() => setShowLogin(true)}
                  >
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUp;
