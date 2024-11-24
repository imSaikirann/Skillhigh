import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../auth/axiosConfig';

export default function CheckoutPage() {
  const [showDetails, setShowDetails] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const { id } = useParams();

  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };

  const plans = {
    'Self-Led': {
      price: 4500,
      features: [
        'Learn at Your Pace',
        'Real-World Projects',
        'Guaranteed Industry Internships',
        'Professional Certifications',
        'Ace the Interview',
        'Unlimited Mock Interviews',
        'Recommendation Letter Boost',
        'Career Launch Assistance',
        'Resume Mastery',
        'Student Network Access',
        'Paid Internship Potential',
      ],
    },
    'Mentor-Driven': {
      price: 6500,
      features: [
        'Learn at Your Pace',
        'Real-World Projects',
        'Guaranteed Industry Internships',
        'Professional Certifications',
        'Ace the Interview',
        'Unlimited Mock Interviews',
        'Recommendation Letter Boost',
        'Career Launch Assistance',
        'Resume Mastery',
        'Student Network Access',
        'Paid Internship Potential',
        'Live Classes',
        'Doubt Clearing Sessions',
        'Dedicated Mentor',
        'Aptitude Grooming',
      ],
    },
  };

  const handleSelectPlan = (planName) => {
    setSelectedPlan(planName);
    setShowDetails(false);
  };

  const handleCheckout = async () => {
    setCheckoutError('');
    setSuccessMessage('');

    try {
      const payload = {
        courseId: id,
        price: plans[selectedPlan].price,
      };

      const response = await axios.post('/api/v1/purchaseCourse/purchases', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      setSuccessMessage(`Purchase successful! Purchase ID: ${response.data.id}`);
    } catch (error) {
      setCheckoutError(
        error.response?.data?.error || 'Something went wrong during checkout.'
      );
    }
  };

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`/api/v1/course/getCourse/${id}`);
        setCourse(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12 font-inter">
      <h1 className="text-3xl font-bold text-center text-gray-800">Checkout</h1>
      <p className="text-center text-gray-600 mt-2">
        Select your plan and explore its features.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(plans).map(([planName, planDetails]) => (
          <div
            key={planName}
            className="border rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow bg-white"
          >
            <h2 className="text-xl font-bold text-gray-800">{planName}</h2>
            <p className="text-gray-600 mt-2">One-time payment</p>
            <p className="text-4xl font-bold text-main mt-4">
              {planDetails.price} <span className="text-lg font-medium">INR</span>
            </p>
            <div className="mt-6 flex flex-col space-y-4">
              <button
                onClick={() => {
                  setSelectedPlan(planName);
                  setShowDetails(true);
                }}
                style={gradientStyle}
                className=" text-white px-6 py-2 rounded-md transition"
              >
                Know More
              </button>
              <button
                onClick={() => handleSelectPlan(planName)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-2 rounded-md transition"
              >
                Select Plan
              </button>
            </div>
          </div>
        ))}
      </div>

      {showDetails && selectedPlan && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-8 relative">
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-800">{selectedPlan} Plan</h2>
            <p className="text-gray-600 mt-2">Features included:</p>
            <ul className="list-disc list-inside mt-4 text-gray-700 space-y-2">
              {plans[selectedPlan].features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {selectedPlan && (
        <div className="mt-10 border-t pt-6">
          <h2 className="text-2xl font-bold text-gray-800">Selected Plan</h2>
          <p className="mt-2 text-gray-600">
            <span className="font-bold">{selectedPlan} Plan</span> -{' '}
            {plans[selectedPlan].price} INR
          </p>
          <button
            style={gradientStyle}
            className=" text-white px-6 py-2 rounded-md transition mt-4"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>

          {successMessage && (
            <p className="mt-4 text-green-600">{successMessage}</p>
          )}
          {checkoutError && (
            <p className="mt-4 text-red-600">{checkoutError}</p>
          )}
        </div>
      )}
    </div>
  );
}
