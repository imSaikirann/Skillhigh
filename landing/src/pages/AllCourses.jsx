import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from '../auth/axiosConfig';

export default function AllCourses() {
  const { id } = useParams(); // Get department ID from the URL
  const [courses, setCourses] = useState(null); // State for courses
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error
  const navigate = useNavigate();

  // Fetch courses when component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/api/v1/department/departments/${id}`); 
        console.log(response.data.department.courses)
        setCourses(response.data.department.courses); 
      } catch (err) {
        console.log(err)
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchCourses();
  }, [id]);

  // Handle selected course navigation
  const handleSelectedCourse = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  // Display loading or error
  if (loading) {
    return <p className="text-center mt-10">Loading courses...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500 mt-10">Error: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4 font-inter">
      {courses.map((course) => (
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

          <button
            className="px-4 py-2 bg-main rounded-md text-white font-medium text-sm mt-4 transition-colors"
            onClick={() => handleSelectedCourse(course.id)}
          >
            See Course
          </button>
        </div>
      ))}
    </div>
  );
}
