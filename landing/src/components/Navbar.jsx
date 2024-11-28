import React, { useState, useEffect, useRef, useContext } from "react";
import { Link,useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { AppContext } from "../store/StoreContext";

export const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] = useState(false);
  const [isCourseDropdownOpen, setIsCourseDropdownOpen] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null); // State for selected department
  const departmentDropdownRef = useRef(null);
  const courseDropdownRef = useRef(null);
  const { token, departments, fetchDepartments } = useContext(AppContext);
const navigate = useNavigate()
  useEffect(() => {
    fetchDepartments();
  }, []);

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setIsDepartmentDropdownOpen(false);
    setIsCourseDropdownOpen(false);
  };

  const handleNavigate = (id) =>{
    navigate(`/courses/${id}`)
    closeMenu()
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        departmentDropdownRef.current &&
        !departmentDropdownRef.current.contains(event.target)
      ) {
        setIsDepartmentDropdownOpen(false);
      }

      if (
        courseDropdownRef.current &&
        !courseDropdownRef.current.contains(event.target)
      ) {
        setIsCourseDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDepartmentClick = (department) => {
    setSelectedDepartment(department.departmentName); 
    setSelectedCourses(department.courses);
    setIsCourseDropdownOpen(true);
  };

  return (
    <div className="bg-white p-3 relative font-inter z-50">
      <div className="bg-nav h-[65px] sm:h-[70px] rounded-full border-2 border-border flex items-center justify-between px-6 md:px-12 lg:px-16">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src={Logo} alt="Logo" className="h-auto w-[120px] md:w-[160px] md:h-auto" />
          </Link>
        </div>

        {/* Navbar Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/">
            <div className="text-md font-normal cursor-pointer hover:text-gray-700">Home</div>
          </Link>
          <Link to="/aboutus">
            <div className="text-md font-normal cursor-pointer hover:text-gray-700">About</div>
          </Link>

          {/* Courses Dropdown */}
          <div
            ref={departmentDropdownRef}
            className="relative text-md font-normal cursor-pointer flex items-center gap-1 hover:text-gray-700"
          >
            <div
              className="flex flex-row items-center justify-center"
              onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
            >
              <h1>Courses</h1>
              <DownArrowIcon />
            </div>

            {/* Department Dropdown */}
            {isDepartmentDropdownOpen && (
              <div className="absolute top-full mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-2 z-10">
                {departments &&
                  departments.map((department, index) => (
                    <div
                      key={index}
                      onClick={() => handleDepartmentClick(department)}
                      className={`flex items-center justify-between px-4 py-2 text-sm rounded cursor-pointer ${
                        selectedDepartment === department.departmentName
                          ? "bg-main text-white" // Selected department color
                          : "hover:bg-gray-100 text-black" // Default hover style
                      }`}
                    >
                      {department.departmentName}
                      <ArrowIcon />
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Courses Dropdown */}
          {isCourseDropdownOpen && selectedCourses.length > 0 && (
            <div
              ref={courseDropdownRef}
              className="absolute top-16 right-52 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-lg p-2 z-10"
            >
              {selectedCourses.map((course, index) => (
                <div
                onClick={()=>handleNavigate(course.id)}
                  key={index}
                  className={`block px-4 py-2 text-sm hover:bg-gray-100 rounded  ${index ===  selectedCourses.length-1 ? "border-b-0" :"border-b-2" } `}
                >
                  {course.courseName}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Profile or Sign-In Button */}
        {token ? (
          <Link to="/profile">
            <button className="text-black bg-nav border-2 border-black px-4 py-2 rounded-full hover:bg-gray-100 hidden md:block">
              Profile
            </button>
          </Link>
        ) : (
          <Link to="/signin">
            <button className="text-black bg-nav border-2 border-black px-4 py-2 rounded-full hover:bg-gray-100 hidden md:block">
              Sign In
            </button>
          </Link>
        )}

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2"
          aria-label="Toggle mobile menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
          </svg>
        </button>

        {isMobileMenuOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-end">
    <div className="h-full w-3/4 max-w-xs bg-white shadow-lg p-6 relative z-50">
      {/* Close Button */}
      <button
        onClick={closeMenu}
        className="absolute top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        aria-label="Close menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          className="w-6 h-6 text-gray-800"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Navigation Links */}
      <nav className="mt-10 space-y-6">
        <Link to="/" onClick={closeMenu} className="block text-lg font-semibold text-gray-700 hover:text-main">
          Home
        </Link>
        <Link to="/aboutus" onClick={closeMenu} className="block text-lg font-semibold text-gray-700 hover:text-main">
          About
        </Link>

        {/* Dropdown for Courses */}
        <div className="relative">
          <div
            onClick={() => setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen)}
            className="flex items-center justify-between cursor-pointer text-lg font-semibold text-gray-700 hover:text-main"
          >
            <span>Courses</span>
            <DownArrowIcon />
          </div>

          {isDepartmentDropdownOpen && (
            <div className="mt-2 bg-gray-50 rounded shadow-md">
              {departments.map((department, index) => (
                <div
                  key={index}
                  onClick={() => handleDepartmentClick(department)}
                  className={`px-4 py-2 text-sm cursor-pointer ${
                    selectedDepartment === department.departmentName
                      ? "bg-main text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {department.departmentName}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Courses List */}
        {isCourseDropdownOpen && selectedCourses.length > 0 && (
          <div className="mt-4 bg-gray-50 rounded shadow-md">
            {selectedCourses.map((course, index) => (
              <Link
                to={`/courses/${course.id}`}
                key={index}
                onClick={closeMenu}
                className="block px-4 py-2 text-sm hover:bg-gray-100 rounded"
              >
                {course.courseName}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Profile or Sign-In Button */}
      <div className="mt-8">
        {token ? (
          <Link to="/profile" onClick={closeMenu}>
            <button className="w-full text-white bg-main px-4 py-2 rounded-full font-semibold hover:bg-main-dark transition">
              Profile
            </button>
          </Link>
        ) : (
          <Link to="/signin" onClick={closeMenu}>
            <button className="w-full text-main border-2 border-main px-4 py-2 rounded-full font-semibold hover:bg-main hover:text-white transition">
              Sign In
            </button>
          </Link>
        )}
      </div>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

// Arrow Icon Component
const ArrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-4 h-4"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
};

// Down Arrow Icon Component
const DownArrowIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
};
