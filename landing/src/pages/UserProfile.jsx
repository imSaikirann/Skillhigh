import React from 'react';
import { useState, useEffect } from 'react';

const UserProfile = () => {
  // Example data - in a real app, this data would likely come from an API or context
  const [userData, setUserData] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    courses: ['React Basics', 'Tailwind CSS Mastery', 'JavaScript for Beginners'],
  });

  // Optionally, you could fetch this data from an API using useEffect
  useEffect(() => {
    // Fetch user data logic here if needed
  }, []);

  return (
    <div className="bg-white p-6 md:p-12 lg:p-16 rounded-lg shadow-lg max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="flex items-center space-x-6 mb-8">
        {/* User Image (you can add an image here) */}
        <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold text-xl">
          {userData.name[0]} {/* Use the first letter of the user's name as a placeholder */}
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{userData.name}</h1>
          <p className="text-lg text-gray-600">{userData.email}</p>
        </div>
      </div>

      {/* Courses Bought Section */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Courses Bought</h2>
        <ul className="space-y-4">
          {userData.courses.map((course, index) => (
            <li key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800">{course}</h3>
            </li>
          ))}
        </ul>
      </div>

      {/* Edit Profile Button (optional) */}
      <div className="mt-8 text-center">
        <button className="bg-nav text-white px-6 py-3 rounded-full hover:bg-gray-100">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
