import React, { useState, useEffect, useContext } from "react";
import logo from "../assets/logo.png";
import menu_icon from "../assets/menu_icon.svg";
import cross_icon from "../assets/cross_icon.svg";
import { AppContext } from "./AppContext";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { setShowAuth, userDetails } = useContext(AppContext);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Check if user is logged in by checking token or user details
  const username = localStorage.getItem('username'); // Assuming username is stored in localStorage

  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileMenu]);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username'); // Remove username on logout
    localStorage.removeItem('userId');
    toast.success("Logged out successfully!");
    window.location.reload(); // Refresh the page after logout or you can use react-router for navigation
  };

  const navigate = useNavigate();

  const handleNavigation = () => {
    const user = localStorage.getItem("token"); // Check if user data exists

    if (user) {
      navigate("/add-product");
    } 
  };

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent">
        <img src={logo} alt="Logo" className="w-[200px] cursor-pointer" />

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-8 text-white">
          <a href="#header" className="cursor-pointer hover:text-black">
            Home
          </a>
          <a href="#about" className="cursor-pointer hover:text-black">
            About
          </a>
          <a href="#products" className="cursor-pointer hover:text-black">
            Products
          </a>
          <a href="#contact" className="cursor-pointer hover:text-black">
            Contacts
          </a>
        </ul>

        {/* Display username if logged in */}
        {username ? (
          <div className="relative">
            <button
              className="hidden md:block bg-white px-8 py-2 rounded-full"
              onClick={toggleDropdown}
            >
              {username}
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-md z-20">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleNavigation}>
                    Add Products
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>navigate('/my-product')}  >
                    My Products
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={()=>navigate('/wishlist')}>
                    Wishlist
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <button
            className="hidden md:block bg-white px-8 py-2 rounded-full"
            onClick={() => setShowAuth(true)}
          >
            Sign Up
          </button>
        )}

        <img
          src={menu_icon}
          alt="Menu Icon"
          className="md:hidden w-7 cursor-pointer"
          onClick={() => setShowMobileMenu(true)}
        />
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-20">
          <div className="flex justify-end p-6">
            <img
              src={cross_icon}
              alt="Close Icon"
              className="w-6 cursor-pointer"
              onClick={() => setShowMobileMenu(false)}
            />
          </div>
          <ul className="flex flex-col items-center gap-3 mt-10 text-lg font-medium">
            <a
              href="#header"
              className="cursor-pointer px-4 py-2 rounded-full inline-block"
              onClick={() => setShowMobileMenu(false)}
            >
              Home
            </a>
            <a
              href="#about"
              className="cursor-pointer px-4 py-2 rounded-full inline-block"
              onClick={() => setShowMobileMenu(false)}
            >
              About
            </a>
            <a
              href="#products"
              className="cursor-pointer px-4 py-2 rounded-full inline-block"
              onClick={() => setShowMobileMenu(false)}
            >
              Products
            </a>
            <a
              href="#contact"
              className="cursor-pointer px-4 py-2 rounded-full inline-block"
              onClick={() => setShowMobileMenu(false)}
            >
              Contacts
            </a>
            <button
              className="cursor-pointer px-4 py-2 rounded-full inline-block"
            >
              Sign up
            </button>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Navbar;
