import React from 'react';
import { Link } from 'react-router-dom';

export default function Signin() {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };
  return (
    <div className="flex items-center justify-center min-h-screen font-inter ">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg ">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Sign In to Skill High
        </h2>

        <form className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-border"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-border"
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <a href="#" className="text-sm text-main hover:underline">
              Forgot Password?
            </a>
          </div>

        <Link to="/profile">
        <button
        style={gradientStyle}
            type="submit"
            className="w-full py-2 text-white bg-main rounded-lg focus:outline-none focus:ring-2 focus:ring-border mt-2"
          >
            Sign In
          </button>
        </Link>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-black font-semibold hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
