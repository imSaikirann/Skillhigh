import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Wave from '../assets/wave.png';

import axios from '../auth/axiosConfig'

export default function Course_Banner() {
  const { id } = useParams(); 
  const [course, setCourse] = useState(null); 
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
   
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/v1/course/getCourse/${id}`); 
       
     
        setCourse(response.data); 
        console.log(course)
      } catch (err) {
        setError(err.message); 
      } finally {
        setLoading(false); 
      }
    };

    fetchCourse();
  }, [id]);

  // Gradient style for the button
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };

  // Show loading or error
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  return (
    <div className="relative bg-white overflow-hidden">
      {/* Background Image */}
      <img
        src={Wave}
        alt="Background"
        className="w-full h-[900px] md:h-[500px] lg:h-[600px] object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-80 pointer-events-none" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-16 z-10 space-y-6 md:space-y-0">
        {/* Text Section */}
        <div className="flex flex-col items-start md:items-start md:text-left w-full md:w-1/2 lg:w-3/5 space-y-4 mt-6 font-inter">
          {/* <div className="px-4 py-2 rounded-full text-main bg-border text-sm font-medium w-auto md:w-max">
            {course.departmentName || 'Course Category'} 
          </div> */}
          <h1 className="text-black text-2xl md:text-4xl lg:text-5xl font-bold">
            {course.courseName || 'Course Title'} {/* Example: Basics of AI */}
          </h1>
          <p className="text-black text-md md:text-lg lg:text-lg mt-3 mb-4 w-full">
            {course.courseDescription || 'Course Description'} {/* Example: Course description */}
          </p>

             {/* Features List */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-black text-md md:text-lg lg:text-lg mt-3">
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Lifetime Membership</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>3+ Real-World Projects</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Expert-Led Live Guidance</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Internship Completion Certification</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Career Support and Placement Services</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>60 Days Program</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-green-500">✓</span>
              <span>Periodic Skills Assessment</span>
            </div>
          </div>



          {/* Enroll Button */}
          <div className="flex justify-start md:justify-start gap-4 md:gap-6 mt-3">
            <button
              style={gradientStyle}
              className=" px-10 py-3 md:px-6 md:py-3 rounded-md text-white font-medium text-sm md:text-base"
            >
              Enroll now
            </button>
          </div>
        </div>

        {/* AI Image */}
        <img
          src={course.courseThumbnail}
          alt="AI Illustration"
          className="w-4/5 md:w-1/2 lg:w-1/3 h-auto object-contain"
        />
      </div>
    </div>
  );
}
