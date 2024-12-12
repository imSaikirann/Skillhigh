import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {  gradientStyle } from '../icons/icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-poppins p-4">
      <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-main dark:text-main">SkillHigh</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Empower your skills. Login to your account.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-600 dark:text-gray-300 font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-main focus:outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 dark:text-gray-300 font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-main focus:outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
          style={gradientStyle}
            type="submit"
            className="w-full bg-main dark:bg-green-500 text-white py-2 rounded-md font-semibold hover:bg-green-600 dark:hover:bg-green-600 focus:outline-none transition-colors duration-200"
          >
            Login
          </button>

          <div className="text-center mt-4">
            <Link to="/verify-email" className="text-main dark:text-green-400 hover:underline">
              Login by Verifying Your Email
            </Link>
          </div>
        </form>

        <div className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Don’t have an account?{' '}
          <Link to="/register" className="text-main dark:text-green-400 font-medium hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;