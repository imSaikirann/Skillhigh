import React, { useState, useEffect } from 'react';
import axios from '../auth/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          return;
        }

        const response = await axios.get('/api/v1/profile/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      

        if (response.status === 200) {
          setUserData(response.data);
          
        } else {
          console.error('Failed to fetch user data');
        }
        console.log(userData)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="p-6 sm:px-12 font-inter bg-gray-100 rounded-md min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-main text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold">
            {userData.name ? userData.name[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-800">{userData.name || 'User'}</h1>
            <p className="text-lg text-gray-500">{userData.email || 'Email not available'}</p>
          </div>
        </div>
        <button
          className="mt-6 md:mt-0 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-sm hover:bg-red-600"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Courses Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Enrolled Courses</h2>
        {userData.purchase&& userData.purchase.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData.purchase.map((course, index) => (
             <div
             key={index}
             className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow"
           >
             <div className="flex items-center space-x-4">
               <div className="bg-main text-white rounded-full w-10 h-10 flex items-center justify-center font-semibold">
                 {index + 1}
               </div>
               <div>
                 <h3 className="text-lg font-medium text-gray-700">
                   {course.courseName || `Course ${index + 1}`}
                 </h3>
                 <p className="text-sm text-gray-500">Purchased by: {course.name}</p>
                 <p className="text-sm text-gray-500">Email: {course.email}</p>
                 <p className="text-sm text-gray-500">
                   Purchase Date: {new Date(course.createdAt).toLocaleDateString()}
                 </p>
                 <p className="text-sm text-gray-500">Price: ₹{course.price}</p>
               </div>
             </div>
           </div>
           
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-lg text-gray-500 italic mb-4">You haven't enrolled in any courses yet!</p>
            <div className="flex justify-center">
              <button
                className="flex items-center px-6 py-3 bg-main text-white font-semibold rounded-lg shadow hover:bg-green-700"
                onClick={() => navigate('/courses')}
              >
                <span>Explore Courses</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  className="w-5 h-5 ml-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
