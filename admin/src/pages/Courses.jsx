import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../store/StoreContext';


export default function Courses() {
  const { courses, fetchCourses } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
    console.log(courses);
  }, []);

  const handleViewDetails = (courseId) => {
    navigate(`/dashboard/courses/${courseId}`);
  };

  const handleAddTopic = (courseId) => {
    console.log(courseId);
    navigate(`/courses/add-topic/${courseId}`);
  };

  return (
    <div className="p-8 sm:pl-80 font-poppins ">
      <h1 className="text-3xl font-semibold mb-4">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="max-w-sm rounded overflow-hidden shadow-sm bg-main bg-opacity-5">
            <img className="w-full h-48 object-cover" src={course.courseThumbnail} alt={course.courseName} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{course.courseName}</div>
              <p className="text-gray-700 text-base">
                {course.courseDescription.length > 100 
                  ? `${course.courseDescription.slice(0, 97)}...` 
                  : course.courseDescription}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2 space-x-2">
              <button
                className="bg-main text-white font-semibold py-2 px-4 rounded"
                onClick={() => handleViewDetails(course.id)}
              >
                View Details
              </button>
              <button
                className="bg-main text-white font-semibold py-2 px-4 rounded"
                onClick={() => handleAddTopic(course.id)}
              >
                Add Topic
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
