import React, { useState, useEffect, useContext } from "react";
import Spinner from "../components/Spinner";
import { AppContext } from "../store/StoreContext";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { fetchAllCourses, courses, loading, error } = useContext(AppContext);

  useEffect(() => {
    if (courses.length === 0) {
      fetchAllCourses();
    }
  }, [courses, fetchAllCourses]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? courses.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === courses.length - 1 ? 0 : prevIndex + 1
    );
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

  
  const visibleCourses =
    courses.length === 0
    //here if screen is sm : card course 1 only display if incre or decremnt same 
    //here if screen is md : three cards should display and same
    //here if screen is lg i want 4 cards rest same
      ? []
      : courses.slice(currentIndex, currentIndex + 4).length === 4
      ? courses.slice(currentIndex, currentIndex + 4)
      : [
          ...courses.slice(currentIndex),
          ...courses.slice(0, 4 - (courses.length - currentIndex)),
        ];

  return (
    <div className="p-6 font-inter bg-gray-50 rounded-md min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-main mb-2">Explore Our Courses</h1>
      <p className="text-gray-600 mb-6">Find the course that suits your interests and skills!</p>

      <div className="relative w-full max-w-6xl">
        {/* Left Button */}
        <button
          onClick={handlePrev}
          className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:shadow-lg focus:outline-none"
          aria-label="Previous Course"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Cards Grid */}
        <div className="flex flex-row gap-6">
          {visibleCourses.map((course, index) => (
            <div
              key={index}
              className="w-full bg-white rounded-lg shadow-lg overflow-hidden flex flex-col items-center hover:shadow-xl transition-all duration-300"
            >
              <img
                src={course.courseThumbnail}
                alt={course.courseName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col items-center">
                <h2 className="text-xl font-semibold text-gray-800">{course.courseName}</h2>
                <p className="text-gray-600 mt-2 text-center">{course.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={handleNext}
          className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 bg-white p-3 rounded-full shadow-md hover:shadow-lg focus:outline-none"
          aria-label="Next Course"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
