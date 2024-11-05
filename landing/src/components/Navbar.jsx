import React, { useState } from 'react';
import Logo from '../assets/logo.jpg';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white p-3 relative font-inter">
      <div className="bg-nav h-[65px] sm:h-[70px] rounded-full border-2 border-border flex items-center justify-between px-6 md:px-12 lg:px-16">

        {/* Logo and Title on the left */}
        <div className="flex items-center space-x-3">
      
          {/* <img src={Logo} alt="Logo" className="h-auto w-[40px] md:w-[50px]" /> */}
          <div className="text-xl md:text-2xl font-semibold">Skill High</div>
        </div>

        {/* Centered Links - Hidden on small screens */}
        <div className="hidden md:flex space-x-6">
          <div className="text-md font-normal cursor-pointer hover:text-gray-700">
            About
          </div>
          <div className="text-md font-normal cursor-pointer hover:text-gray-700">
            Blogs
          </div>
          <div className="text-md font-normal cursor-pointer hover:text-gray-700">
            Courses
          </div>
        </div>


        <button className="text-black bg-nav border-2 border-black px-4 py-2 rounded-full hover:bg-gray-100 hidden md:block">
          Sign In
        </button>

 
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="md:hidden p-2"
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu - Shows links and button on smaller screens */}
      {isMobileMenuOpen && (
        <div className="md:hidden flex flex-col items-center absolute top-[80px] left-0 right-0 bg-nav p-4 space-y-4 rounded-lg shadow-lg z-50">
          <div className="text-md font-normal cursor-pointer hover:text-gray-700">
            About
          </div>
          <div className="text-md font-normal cursor-pointer hover:text-gray-700">
            Blogs
          </div>
          <div className="text-md font-normal cursor-pointer hover:text-gray-700">
            Courses
          </div>
          <button className="text-black bg-nav border-2 border-black px-4 py-2 rounded-full hover:bg-gray-100">
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};
