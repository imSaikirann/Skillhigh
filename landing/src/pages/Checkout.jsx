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

  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: '',
  });

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

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (!userInfo.name || !userInfo.email || !userInfo.phone) {
      setCheckoutError('Please fill in all the required details.');
      return;
    }
  
    const isScriptLoaded = await loadRazorpayScript();
    if (!isScriptLoaded) {
      setCheckoutError('Failed to load Razorpay SDK. Please refresh the page.');
      return;
    }
  
    try {
      // Prepare payload for order creation
      const payload = {
        courseId: id,
        price: plans[selectedPlan].price,
        phone: userInfo.phone,
        email: userInfo.email,
      };
  
      // Make API call to create Razorpay order
      const response = await axios.post('/api/v1/payments/createOrder', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      const { orderId, amount, currency } = response.data;
  
      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_LIVE_ID, // Razorpay key
        amount,
        currency,
        order_id: orderId,
        name: 'Course Purchase',
        description: `Purchase of ${selectedPlan} plan`,
        image: 'your-logo-url', // Update with your logo URL
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: userInfo.phone,
        },
        theme: {
          color: '#0D8267',
        },
        handler: async (response) => {
          // Payment success handler
          setSuccessMessage(
            'Payment successful! Your course purchase is confirmed. Check your Profile for further details.'
          );
          setCheckoutError('');
          console.log('Payment Successful:', response);
  
          // Optional: Verify payment server-side
          try {
            await axios.post('/api/v1/payments/verifyPayment', {
              courseId: id,
              phone:userInfo.phone,
              email:userInfo.email,
              price: plans[selectedPlan].price,
              orderId,
              paymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            });
          } catch (err) {
            console.error('Payment verification failed:', err);
            setCheckoutError('Payment verification failed. Please contact support.');
          }
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
  
      // Payment failure handler
      rzp.on('payment.failed', (response) => {
        setCheckoutError(`Payment failed: ${response.error.description}`);
      });
    } catch (error) {
      console.error(error);
      setCheckoutError('Something went wrong during checkout.');
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
      <p className="text-center text-gray-600 mt-2">Select your plan and explore its features.</p>

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
                onClick={() => setShowDetails(!showDetails)}
                style={gradientStyle}
                className="text-white px-6 py-2 rounded-md transition"
              >
                {showDetails ? 'Hide Details' : 'Know More'}
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

      {selectedPlan && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-gray-800">Fill Your Details</h2>
          <div className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="border rounded-md w-full px-4 py-2"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              className="border rounded-md w-full px-4 py-2"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="border rounded-md w-full px-4 py-2"
              value={userInfo.phone}
              onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
            />
          </div>

          <div className="mt-6">
            <button
              style={gradientStyle}
              className="text-white px-6 py-2 rounded-md transition"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
            {successMessage && (
  <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-800 rounded-md">
    <p className="font-bold">Thank you!</p>
    <p>{successMessage}</p>
  </div>
)}

          </div>
        </div>
      )}
    </div>
  );
}
