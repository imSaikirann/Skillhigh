import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { gradientStyle } from '../icons/icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [modalEmail, setModalEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Handle email submission logic here (e.g., send OTP)
    setIsModalOpen(false);
    setIsOtpModalOpen(true);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Handle OTP verification logic here
    setIsOtpModalOpen(false);
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
           <Link to="/play">
           Login
           </Link>
          </button>
      

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="text-main dark:text-main hover:underline"
            >
              Login by Verifying Your Email
            </button>
          </div>
        </form>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Verify Your Email</h3>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <label htmlFor="modalEmail" className="block text-gray-600 dark:text-gray-300 font-medium">Email</label>
                  <input
                    type="email"
                    id="modalEmail"
                    value={modalEmail}
                    onChange={(e) => setModalEmail(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-main focus:outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={gradientStyle}
                    className="px-4 py-2 bg-main dark:bg-green-500 text-white rounded-md hover:bg-green-600 dark:hover:bg-green-600"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isOtpModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">Enter OTP</h3>
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div>
                  <label htmlFor="otp" className="block text-gray-600 dark:text-gray-300 font-medium">OTP</label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-main focus:outline-none bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    placeholder="Enter the OTP"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsOtpModalOpen(false)}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={gradientStyle}
                    className="px-4 py-2 bg-main dark:bg-green-500 text-white rounded-md hover:bg-green-600 dark:hover:bg-green-600"
                  >
                    Verify
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;