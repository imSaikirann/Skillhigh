import React, { useState } from 'react';
import Logo from '../assets/logo.jpg';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="bg-white p-3 relative font-inter">
      <div className="bg-nav h-[65px] sm:h-[70px] rounded-full border-2 border-border flex items-center justify-between px-6 md:px-12 lg:px-16">

        {/* Logo and Title on the left */}
        <div className="flex items-center space-x-3">
          {/* <img src={Logo} alt="Logo" className="h-auto w-[40px] md:w-[50px]" /> */}
          <Link to="/"><div className="text-xl md:text-2xl font-semibold">Skill High</div></Link>
        </div>

    
        <div className="hidden md:flex space-x-6">
          <Link to="/aboutus">
            <div className="text-md font-normal cursor-pointer hover:text-gray-700">
              About
            </div>
          </Link>
          <Link to="/blogs">
            <div className="text-md font-normal cursor-pointer hover:text-gray-700">
              Blogs
            </div>
          </Link>
          <Link to="/courses">
            <div className="text-md font-normal cursor-pointer hover:text-gray-700">
              Courses
            </div>
          </Link>
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

      {/* Full-Screen Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-nav flex flex-col items-center justify-center space-y-6 text-center z-50">
          <button onClick={closeMenu} className="absolute top-4 right-4 p-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-black">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <Link to='/aboutus' onClick={closeMenu}>
            <div className="text-lg font-semibold cursor-pointer hover:text-gray-700">
              About
            </div>
          </Link>
          <Link to='/blogs' onClick={closeMenu}>
            <div className="text-lg font-semibold cursor-pointer hover:text-gray-700">
              Blogs
            </div>
          </Link>
          <Link to='/courses' onClick={closeMenu}>
            <div className="text-lg font-semibold cursor-pointer hover:text-gray-700">
              Courses
            </div>
          </Link>
          <button onClick={closeMenu} className="text-black bg-nav border-2 border-black px-6 py-3 rounded-full hover:bg-gray-100">
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};
