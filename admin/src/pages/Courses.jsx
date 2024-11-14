import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../auth/axiosConfig';
import Spinner from '../components/Spinner';


export default function Courses() {
  const { departmentId } = useParams();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`/api/v1/department/departments/${departmentId}`);
        setCourses(response.data.courses);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, [departmentId]);
  if (!courses.length) return <div className='flex item-center justify-center h-screen px-6 sm:pl-80'><Spinner /></div>;
  return (
    <div className="p-8 sm:pl-80 font-poppins">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-semibold">Courses</h1>
        
        <button className="bg-main text-white font-semibold py-2 px-4 rounded" onClick={() => navigate(`/dashboard/addcourses/${departmentId}`)}>Add New Course</button>
      
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.length > 0 ? (
          courses.map((course) => (
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
                <button className="bg-main text-white font-semibold py-2 px-4 rounded" onClick={() => navigate(`/dashboard/topics/${course.id}`)}>View Details</button>
                
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No courses found for this department.</p>
        )}
      </div>
    </div>
  );
}
