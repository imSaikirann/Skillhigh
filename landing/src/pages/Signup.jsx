import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, provider } from '../auth/firebase'; 
import { signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth'; 
import axios from '../auth/axiosConfig'
export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };

  const navigate = useNavigate(); 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleGoogleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      // Get Firebase ID Token
      const token = await user.getIdToken();
  
      // Send to backend
      const response = await axios.post('/api/v1/user/signup', {
        token,
        email: user.email,
        name: user.displayName,
        photoUrl: user.photoURL,
      });
  
      if (response.data.success) {
        const { token: jwtToken, user } = response.data;
        console.log('JWT Token:', jwtToken);
     
        localStorage.setItem('token', jwtToken);
        navigate('/profile')
      }
    } catch (error) {
      console.error('Signup Error:', error.message);
    }
  };
  

  const handleEmailSignup = async (e) => {
    e.preventDefault();  // Prevent the default form submission
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
     
      // Get Firebase ID Token
      const token = await user.getIdToken();
  
      // Send to backend
      const response = await axios.post('/api/v1/user/signup', {
        token,
        email: user.email,
        name: user.displayName,
        photoUrl: user.photoURL,
      });
  
      if (response.data.success) {
        const { token: jwtToken, user } = response.data;
        console.log('JWT Token:', jwtToken);
     
        localStorage.setItem('token', jwtToken);
        navigate('/profile')
      }
   
    } catch (error) {
      console.error('Error during email signup:', error.message);
      setErrorMessage(error.message); // Display error message
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 font-inter">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Sign Up for Skill High
        </h2>

        {/* Email and Password Form */}
        <form className="space-y-6" onSubmit={handleEmailSignup}>
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-border"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-border"
                placeholder="Create your password"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="text-red-600 text-sm text-center">
              {errorMessage}
            </div>
          )}

          {/* Sign Up Button */}
          <button
            type="submit"
            style={gradientStyle}
            className="w-full py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-border"
          >
            Sign Up
          </button>
        </form>

        {/* Google Sign Up Button */}
        <div className="mt-4 text-center">
          <button
            onClick={handleGoogleSignup}
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Sign Up with Google
          </button>
        </div>

        {/* Already Have an Account */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/signin" className="text-black font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
