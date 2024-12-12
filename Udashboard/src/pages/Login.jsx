import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkColor dark:bg-gray-900 font-poppins p-4 ">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-xl w-full max-w-md">
     <div>
    
        <h2 className="text-2xl sm:text-3xl font-bold text-main text-left mb-3 sm:mb-4">SkillHigh</h2>
     </div>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-left mb-4 sm:mb-6 text-opacity-80">Login to Your Account</h2>
        
        <form onSubmit={handleLogin} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-md shadow-sm focus:outline-none "
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-600 font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 sm:px-4 sm:py-2 border rounded-md shadow-sm focus:outline-none "
              placeholder="Enter your password"
              required
            />
          </div>

        <Link to="/play">
        <button
            type="submit"
            className="w-full bg-main text-white py-2 rounded-md font-semibold hover:bg-green-700 focus:outline-none transition-colors duration-100"
          >
            Login
          </button>
        </Link>

          <Link to="/play">
          <div className="text-center mt-4">
            <a href="/verify-email" className="text-main hover:underline">Login by Verify your email</a>
          </div>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;