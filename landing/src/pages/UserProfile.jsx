import React from 'react';
import { useState, useEffect } from 'react';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    courses: ['React Basics', 'Tailwind CSS Mastery', 'JavaScript for Beginners'],
  });

  useEffect(() => {
    // Optionally, fetch user data here if needed
  }, []);

  return (
    <div className="bg-white p-6 md:p-12 lg:p-16 rounded-lg shadow-xl max-w-4xl mx-auto text-black">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 mb-8">
        {/* User Image Placeholder */}
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center  font-semibold text-3xl">
          {userData.name[0]} {/* Initial of the user's name */}
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold">{userData.name}</h1>
          <p className="text-lg text-gray-800">{userData.email}</p>
        </div>
      </div>

      {/* Courses Bought Section */}
      <div>
        <h2 className="text-3xl font-semibold mb-4">Courses Bought</h2>
        <ul className="space-y-4">
          {userData.courses.map((course, index) => (
            <li key={index} className="bg-border border-2 border-main p-4 rounded-lg  text-gray-800 shadow hover:shadow-lg transition-shadow duration-200">
              <h3 className="text-xl font-semibold">{course}</h3>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Profile Button */}
      <div className="mt-10 text-center">
        <button className="bg-main px-8 py-3 rounded-full duration-200 text-white font-semibold shadow-lg">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
