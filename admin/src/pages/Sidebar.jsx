import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.jpg';
import Button from '../components/Button';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Sidebar() {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div>
    
      <div className="md:hidden flex items-center p-4 h-16 bg-main text-white">
        <button onClick={() => setIsSidebarOpen(true)}>
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

   
      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white text-black border-r-2 font-poppins  transition-transform transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 z-50 flex flex-col`}
      >
    
        <div className="md:hidden flex justify-end p-4">
          <button onClick={closeSidebar}>
            <XMarkIcon className="h-6 w-6 text-main hover:text-opacity-55" />
          </button>
        </div>

    
        <div className="p-4">
        <img src={Logo} className='h-auto w-[200px]'></img>
        </div>

        <nav className="flex flex-col gap-4 px-4">
          <Link to="/" className=" rounded-md p-2" onClick={closeSidebar}>
            Dashboard
          </Link>

          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="rounded-md p-2 w-full text-left flex justify-between items-center"
            >
              Courses
              <span>{isDropdownOpen ? '-' : '+'}</span>
            </button>
            {isDropdownOpen && (
              <div className="flex flex-col bg-main bg-opacity-10 rounded-md  p-2 mt-1">
                <Link to="/courses/add" className=" text-main p-2 rounded-md" onClick={closeSidebar}>
                  Add Course
                </Link>
                <Link to="/courses/manage" className=" text-main p-2 rounded-md" onClick={closeSidebar}>
                  Manage Courses
                </Link>
              </div>
            )}
          </div>

        
        </nav> 

    
      </div>
    </div>
  );
}
