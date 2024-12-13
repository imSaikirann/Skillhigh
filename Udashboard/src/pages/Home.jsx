import React from "react";
import { gradientStyle } from '../icons/icons';
import { Link } from "react-router-dom";
export default function Home() {
  const courses = [
    {
      id: 1,
      title: "Course Title 1",
      description: "Learn something amazing today in this course!",
      image: "https://via.placeholder.com/400x200",
    },
    {
      id: 2,
      title: "Course Title 2",
      description: "Expand your knowledge with this engaging course.",
      image: "https://via.placeholder.com/400x200",
    },
    {
      id: 3,
      title: "Course Title 3",
      description: "Master new skills in this comprehensive course.",
      image: "https://via.placeholder.com/400x200",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-darkBg text-gray-800 dark:text-gray-200 p-6 font-poppins">
      {/* Welcome Message */}
      <header className="mb-10 text-left">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4 text-main">
          Welcome, Sai Kiran
        </h1>
        <p className="text-lg text-darkBg dark:text-darkText">
          Explore our curated courses and take the next step in your journey!
        </p>
      </header>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-darkBg border dark:border-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
          >
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-56 object-cover"
            />
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-3">{course.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {course.description}
              </p>
              <button style={gradientStyle} className="w-full  text-white py-3 rounded-lg transition">
                <Link to="/play">
                View Course
                </Link>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
