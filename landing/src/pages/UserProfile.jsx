import React, { useState, useEffect } from 'react';
import axios from '../auth/axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const navigate = useNavigate()

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
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log(response.data);
        if (response.status === 200) {
          setUserData(response.data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div className="bg-white p-6 md:p-12 lg:p-16 rounded-lg max-w-4xl mx-auto text-black">
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          {/* Displaying user's profile picture */}
          {userData.photoUrl ? (
            <img src={userData.photoUrl} alt="User Profile" className="w-24 h-24 rounded-full" />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">No Image</div>
          )}

        </div>
        <div className="text-center md:text-left">
          {/* Displaying user's name */}
          <h1 className="text-4xl font-bold">{userData.name}</h1>
          {/* Displaying user's email */}
          <p className="text-lg text-gray-800">{userData.email}</p>
        </div>

      </div>

      {/* Edit Profile Button */}
      <div className="mt-10 text-center">
        <button className="bg-main px-8 py-3 rounded-full duration-200 text-white font-semibold shadow-lg">
          Edit Profile
        </button>
        <button className='text-red-400' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
