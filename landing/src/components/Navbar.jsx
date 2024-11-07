import React, { useState, useEffect, useRef } from 'react';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  
  const coursesDropdownRef = useRef(null);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsCoursesDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (coursesDropdownRef.current && !coursesDropdownRef.current.contains(event.target)) {
        setIsCoursesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white p-3 relative font-inter z-50">
      <div className="bg-nav h-[65px] sm:h-[70px] rounded-full border-2 border-border flex items-center justify-between px-6 md:px-12 lg:px-16">
        
        {/* Logo and Title on the left */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-auto w-[120px] md:w-[160px] md:h-auto" /> 
          </Link>
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/">
            <div className="text-md font-normal cursor-pointer hover:text-gray-700">
              Home
            </div>
          </Link>
          <Link to="/aboutus">
            <div className="text-md font-normal cursor-pointer hover:text-gray-700">
              About
            </div>
          </Link>
          
          {/* Courses Dropdown Wrapper */}
          <div 
            onClick={() => setIsCoursesDropdownOpen(!isCoursesDropdownOpen)} 
            ref={coursesDropdownRef}
            className="relative text-md font-normal cursor-pointer flex items-center gap-1 hover:text-gray-700"
          >
            <h1>Courses</h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            
            {/* Dropdown Menu */}
            {isCoursesDropdownOpen && (
              <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-2 z-10">
                <Link to="/courses/computer-science" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded">
                  Computer Science
                </Link>
                <Link to="/courses/artificial-intelligence" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded">
                  Artificial Intelligence
                </Link>
                <Link to="/courses/cyber-security" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded">
                  Cyber Security
                </Link>
                <Link to="/courses/ui-ux-design" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded">
                  UI/UX Designing
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sign In Button */}
        <Link to="/signin">
          <button className="text-black bg-nav border-2 border-black px-4 py-2 rounded-full hover:bg-gray-100 hidden md:block">
            Sign In
          </button>
        </Link>

        {/* Mobile Menu Toggle */}
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

          <Link to='/' onClick={closeMenu}>
            <div className="text-lg font-semibold cursor-pointer hover:text-gray-700">
              Home
            </div>
          </Link>

          <Link to='/aboutus' onClick={closeMenu}>
            <div className="text-lg font-semibold cursor-pointer hover:text-gray-700">
              About
            </div>
          </Link>
         
          {/* Mobile Courses Dropdown */}
          <Link to='/courses' onClick={closeMenu}>
            <div className="text-lg font-semibold flex flex-row cursor-pointer hover:text-gray-700">
              <h1>Courses</h1>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </Link>

          <Link to="/signin">
            <button onClick={closeMenu} className="text-black bg-nav border-2 border-black px-6 py-3 rounded-full hover:bg-gray-100">
              Sign In
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};
