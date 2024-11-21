import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.jpg';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
export default function Sidebar() {
  const [isDropdownOpenCourses, setIsDropdownOpenCourses] = React.useState(false);
  const [isDropdownOpenDashboard, setIsDropdownOpenDashboard] = React.useState(false);
  const [isDropdownOpenUser, setIsDropdownOpenUser] = React.useState(false);
  const [isDropdownOpenSettings, setIsDropdownOpenSettings] = React.useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
const navigate = useNavigate()

  const toggleDropdownCourses = () => setIsDropdownOpenCourses(!isDropdownOpenCourses);
  const toggleDropdownDashboard = () => setIsDropdownOpenDashboard(!isDropdownOpenDashboard);
  const toggleDropdownUsers = () => setIsDropdownOpenUser(!isDropdownOpenUser);
  const toggleDropdownSettings = () => setIsDropdownOpenSettings(!isDropdownOpenSettings);


  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    window.location.reload();
  }
  return (
    <div className=''>
      <div className="md:hidden flex items-center p-4 h-16 bg-main text-white ">
        <button onClick={() => setIsSidebarOpen(true)}>
          <Bars3Icon className="h-6 w-6" />
        </button>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white text-black border-r-2 font-poppins transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0 z-50 flex flex-col`}
      >
        <div className="md:hidden flex justify-end p-4">
          <button onClick={closeSidebar}>
            <XMarkIcon className="h-6 w-6 text-main hover:text-opacity-55" />
          </button>
        </div>

        <div className="p-4">
          <img src={Logo} className="h-auto w-[200px]" alt="Logo" />
        </div>

        <nav className="flex flex-col gap-4 px-4">
          <Link to="/" className="rounded-md p-2" onClick={closeSidebar}>
            Admin Dashboard
          </Link>

          <Link to="/contactus" className="rounded-md p-2" onClick={closeSidebar}>
            Customers
          </Link>

          {/* Courses Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdownCourses}
              className="rounded-md p-2 w-full text-left flex justify-between items-center"
            >
              Courses
              <span>{isDropdownOpenCourses ? '-' : '+'}</span>
            </button>
            {isDropdownOpenCourses && (
              <div className="flex flex-col bg-main bg-opacity-10 rounded-md p-2 mt-1">
                <Link to="/dashboard/departments" className="text-main p-2 rounded-md" onClick={closeSidebar}>
                  Departments
                </Link>


              </div>
            )}
          </div>

          {/* Dashboard Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdownDashboard}
              className="rounded-md p-2 w-full text-left flex justify-between items-center"
            >
              Website Dashboard
              <span>{isDropdownOpenDashboard ? '-' : '+'}</span>
            </button>
            {isDropdownOpenDashboard && (
              <div className="flex flex-col bg-main bg-opacity-10 rounded-md p-2 mt-1">
                <Link to="/website/faq" className="text-main p-2 rounded-md" onClick={closeSidebar}>
                  FAQS
                </Link>
                <Link to="/website/mentors" className="text-main p-2 rounded-md" onClick={closeSidebar}>
                  Mentors
                </Link>
                <Link to="/reviews" className="text-main p-2 rounded-md" onClick={closeSidebar}>
                  Testimonals
                </Link>
              </div>
            )}
          </div>

          {/* Users Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdownUsers}
              className="rounded-md p-2 w-full text-left flex justify-between items-center"
            >
              Users
              <span>{isDropdownOpenUser ? '-' : '+'}</span>
            </button>
            {isDropdownOpenUser && (
              <div className="flex flex-col bg-main bg-opacity-10 rounded-md p-2 mt-1">
                <Link to="/dashboard/users/add" className="text-main p-2 rounded-md" onClick={closeSidebar}>
                  Add New User
                </Link>
                <Link to="/dashboard/users" className="text-main p-2 rounded-md" onClick={closeSidebar}>
                  View Users
                </Link>
              </div>
            )}
          </div>

          {/* Logout Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdownSettings}
              className="rounded-md p-2 w-full text-left flex justify-between items-center"
            >
              Settings
              <span>{isDropdownOpenSettings ? '-' : '+'}</span>
            </button>
            {isDropdownOpenSettings && (
              <div className="flex flex-col bg-main bg-opacity-10 rounded-md p-2 mt-1">

                <button onClick={handleLogout()} className="bg-red-500 text-white rounded-md px-4 py-2 font-sans font-medium shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300">
                  Logout
                </button>



              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
}
