import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Spinner from "../components/Spinner";
import { AppContext } from "../store/StoreContext";

export default function AllCourses() {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { fetchAllCourses, courses, loading, error } = useContext(AppContext);

  // Fetch courses only once
  useEffect(() => {
    if (courses.length === 0) {
      fetchAllCourses(); // Fetch if not already loaded
    } else {
      setFilteredCourses(courses); // Use already fetched data
    }
  }, [courses, fetchAllCourses]);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = courses.filter((course) =>
      course.courseName.toLowerCase().includes(searchValue)
    );
    setFilteredCourses(filtered);
  };

  const handleSelectedCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-10">
        <Spinner />
      </div>
    );
  }
  if (error) {
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  }

  return (
    <div className="p-6 font-inter bg-gray-50 rounded-md min-h-screen">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-main mb-2">Explore Our Courses</h1>
            <p className="text-gray-600 mb-4">Find the course that suits your interests and skills!</p>
          </div>
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
            />
            <svg
              className="absolute top-3 right-3 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <img
              src={course.courseThumbnail}
              alt={`${course.courseName} Thumbnail`}
              className="w-full h-60 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{course.courseName}</h3>
              <p
                className="text-sm text-gray-600 mb-4 overflow-hidden text-ellipsis"
                style={{ height: "60px" }}
              >
                {course.courseDescription}
              </p>
              <p className="text-gray-500 text-sm mb-4">Lessons: {course.courseCount}</p>
              <button
                className="block w-full bg-main text-white text-center py-2 rounded-lg font-medium transition-colors hover:bg-main-dark"
                onClick={() => handleSelectedCourse(course.id)}
              >
                See Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
