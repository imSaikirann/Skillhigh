import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.jpg'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md font-poppins">
      <div className="px-4">
        <div className="flex justify-between items-center h-24 border-b-2  ">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-main hover:text-green-600 transition duration-200">
             <img src={Logo} className='h-auto w-[200px]'></img>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex space-x-6">
              <Link to="/" className="text-gray-800 hover:text-main transition duration-200">Home</Link>
              <Link to="/courses" className="text-gray-800 hover:text-main transition duration-200">Courses</Link>
              <Link to="/about" className="text-gray-800 hover:text-main transition duration-200">About Us</Link>
              <Link to="/contact" className="text-gray-800 hover:text-main transition duration-200">Contact</Link>
              <Link to="/login" className="text-gray-800 hover:text-main transition duration-200">Login</Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-main focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block text-gray-800 hover:text-main transition duration-200">Home</Link>
          <Link to="/courses" className="block text-gray-800 hover:text-main transition duration-200">Courses</Link>
          <Link to="/about" className="block text-gray-800 hover:text-main transition duration-200">About Us</Link>
          <Link to="/contact" className="block text-gray-800 hover:text-main transition duration-200">Contact</Link>
          <Link to="/login" className="block text-gray-800 hover:text-main transition duration-200">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
