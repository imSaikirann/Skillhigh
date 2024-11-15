import React, { useContext, useEffect } from 'react';
import { AppContext } from '../store/StoreContext';

export default function AllCourses() {
  const { courses, fetchCourses } = useContext(AppContext);
  console.log(courses)
  useEffect(() => {
    if (!courses) {
      fetchCourses();
    }
  }, [courses, fetchCourses]);

  if (!courses) {
    return <p>Loading courses...</p>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {courses.map((course) => (
        <div key={course.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-white border border-gray-200 rounded-lg shadow-md p-4">
          <img src={course.courseThumbnail} alt={`${course.courseName} Thumbnail`} className="w-full h-40 object-cover rounded-md mb-4" />
          <h3 className="text-xl font-semibold mb-2 text-gray-800">{course.courseName}</h3>
          <p className="text-sm text-gray-600 mb-4">{course.courseDescription}</p>
          <p className="text-gray-500 text-sm">Lessons: {course.courseCount}</p>
        </div>
      ))}
    </div>
  );
}
