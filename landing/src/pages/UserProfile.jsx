import React, { useState, useEffect, useContext } from 'react';
import axios from '../auth/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../store/StoreContext';
import Spinner from '../components/Spinner';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setToken } = useContext(AppContext);
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found in localStorage');
          setLoading(false);
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
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(false);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-6 sm:px-12 font-inter bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <div className="flex items-center space-x-3 sm:space-x-6">
          <div style={gradientStyle } className=" text-white rounded-full w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center text-3xl font-bold">
            {userData.name ? userData.name[0].toUpperCase() : 'U'}
          </div>
          <div>
            <h1 className="text-xl sm:text-3xl font-semibold text-gray-800">{userData.name || 'User'}</h1>
            <p className="text-md sm:text-lg text-gray-500">{userData.email || 'Email not available'}</p>
          </div>
        </div>
        <button
          className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Courses Section */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Enrolled Courses</h2>
        {userData.purchase && userData.purchase.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {userData.purchase.map((course, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="bg-border text-main rounded-full w-10 h-10 flex items-center justify-center font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-700">{course.courseName || `Course ${index + 1}`}</h3>
                  </div>
                </div>
                <p className="text-sm text-gray-600">Purchased by: {course.name}</p>
                <p className="text-sm text-gray-600">Email: {course.email}</p>
                <p className="text-sm text-gray-600">
                  Purchase Date: {new Date(course.createdAt).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600 font-semibold">Price: ₹{course.price}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-gray-500 italic mb-4">You haven't enrolled in any courses yet!</p>
            <button
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-400 to-blue-500 text-white font-medium rounded-lg shadow hover:from-green-500 hover:to-blue-600 transition"
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
        )}
      </div>
    </div>
  );
};

export default UserProfile;
