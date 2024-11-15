import React, { useContext, useEffect } from 'react';
import { AppContext } from '../store/StoreContext';
import { Link } from 'react-router-dom';

export default function AllCourses() {
  const { courses, fetchCourses } = useContext(AppContext);

  useEffect(() => {
    if (!courses) {
      fetchCourses();
    }
  }, [courses, fetchCourses]);

  if (!courses) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 font-inter">
      {courses[0].courses.map((course) => (
        <div
          key={course.id}
          className="bg-white border border-gray-200 rounded-lg shadow-md p-4 transition-transform hover:scale-105 hover:shadow-lg"
        >
          <img
            src={course.courseThumbnail}
            alt={`${course.courseName} Thumbnail`}
            className="w-full h-40 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.courseName}</h3>
          <p
            className="text-sm text-gray-600 mb-4 overflow-hidden text-ellipsis"
            style={{ height: '60px' }} // Fixed height for the description
          >
            {course.courseDescription}
          </p>
          <p className="text-gray-500 text-sm">Lessons: {course.courseCount}</p>
          <Link to='/courses'>
            <button
              className="px-4 py-2 bg-main rounded-md text-white font-medium text-sm mt-4 transition-colors"
            >
              See Course
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
