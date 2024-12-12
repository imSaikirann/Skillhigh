import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/newLogo.png';
import { Sun, Moon, gradientStyle } from '../icons/icons';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark', !darkMode);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') === 'dark';
    setDarkMode(storedTheme);
    if (storedTheme) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md font-poppins">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20 border-b-2 dark:border-gray-800">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={Logo} className="h-auto w-[150px]" alt="Logo" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <button
              type="button"
              className="bg-black text-white focus:ring-2 font-medium rounded-full text-sm px-5 py-2.5 transition duration-200 dark:bg-white dark:text-black">
              Login
            </button>
          <a href='https://skillhigh.in/'   target="_blank">
          <button
         
          type="button"
          style={gradientStyle}
          className="text-white focus:ring-2 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 transition duration-200 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          Join Now
        </button>
          </a>
           
          
            <button
              onClick={toggleDarkMode}
              className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-200"
              aria-label="Toggle Dark Mode">
              {darkMode ? <Sun /> : <Moon />}
            </button>
          </div>
         <div className='md:hidden'>
         <button
              onClick={toggleDarkMode}
              className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-200"
              aria-label="Toggle Dark Mode">
              {darkMode ? <Sun /> : <Moon />}
            </button>
          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleSidebar}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-600 dark:text-white hover:text-main focus:outline-none"
            aria-label="Toggle Sidebar">
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              {sidebarOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
         </div>
        </div>

        {/* Sidebar */}
        <div
          className={`fixed inset-y-0 left-0 w-full  bg-white dark:bg-gray-900 shadow-lg transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out z-50 overflow-y-auto`}
        >
          <div className="flex justify-between items-center px-4 py-4 border-b dark:border-gray-800">
            <Link to="/" className="flex items-center">
              <img src={Logo} className="h-auto w-[120px]" alt="Logo" />
            </Link>
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-600 dark:text-white hover:text-main focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="px-4 py-6 space-y-6">
         <div className='flex flex-col gap-3'>
         <button
              type="button"
              className="bg-black text-white focus:ring-2 font-medium rounded-full text-sm px-5 py-2.5 transition duration-200 dark:bg-white dark:text-black">
              Login
            </button>
            <button
              type="button"
              style={gradientStyle}
              className="text-white focus:ring-2 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 transition duration-200 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              Join Now
            </button>
         </div>
           
            {/* <button
              onClick={toggleDarkMode}
              className="block w-full text-left px-4 py-2 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-200"
              aria-label="Toggle Dark Mode">
              {darkMode ? <Sun /> : <Moon />}
            </button> */}
          </div>
        </div>

        {/* Overlay for closing sidebar */}
        {sidebarOpen && (
          <div
            onClick={toggleSidebar}
            className="fixed inset-0 bg-black opacity-50 z-40"
            aria-hidden="true"
          ></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;