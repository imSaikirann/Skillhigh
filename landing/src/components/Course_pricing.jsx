import React from 'react';
import Wave from '../assets/wave.png';
import { Link,useNavigate,useParams } from 'react-router-dom';
export default function CoursePricing() {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };

  const navigate = useNavigate()
  const { id } = useParams()
  console.log(id)
  const handleCourseCheckout = (id) => {
    navigate(`/course/checkout/${id}`);
  };

  const endlessLearningFeatures = [
    "Learn at Your Pace",
    "Real-World Projects",
    "Guaranteed Industry Internships",
    "Professional Certifications",
    "Ace the Interview",
    "Unlimited Mock Interviews",
    "Recommendation Letter Boost",
    "Career Launch Assistance",
    "Resume Mastery",
    "Student Network Access",
    "Paid Internship Potential",
    "Live Classes",
    "Doubt Clearing Sessions",
    "Dedicated Mentor",
    "Aptitude Grooming",
  ];

  const selfLedFeatures = [
    { name: "Learn at Your Pace", included: true },
    { name: "Real-World Projects", included: true },
    { name: "Guaranteed Industry Internships", included: true },
    { name: "Professional Certifications", included: true },
    { name: "Ace the Interview", included: true },
    { name: "Unlimited Mock Interviews", included: true },
    { name: "Recommendation Letter Boost", included: true },
    { name: "Career Launch Assistance", included: true },
    { name: "Resume Mastery", included: true },
    { name: "Student Network Access", included: true },
    { name: "Paid Internship Potential", included: true },
    { name: "Live Classes", included: false },
    { name: "Doubt Clearing Sessions", included: false },
    { name: "Dedicated Mentor", included: false },
    { name: "Aptitude Grooming", included: false },
  ];

  return (
    <div className="relative bg-white overflow-hidden mt-5">
      <img
        src={Wave}
        alt="Background Wave"
        className="w-full h-[1500px] md:h-[1000px] lg:h-[900px] object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-black p-4 font-inter">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-main ">
            Specialized Learning Fee
          </h1>
          <p className="text-lg font-medium md:text-xl text-gray-700 mt-">
            Choose the perfect plan to kickstart your journey
          </p>

        </div>

        {/* Pricing Section */}
        <div className="flex flex-col md:flex-row lg:flex-row gap-6 mt-12 items-center justify-center">

          {/* Self-Led Package */}
          <div className="w-[350px] bg-white p-6 rounded-md shadow-md flex flex-col items-center text-center space-y-4">
            <p className="text-lg font-bold text-textColor">Self-Led</p>
            <p className="text-5xl font-bold text-main">4,500 <span className="text-2xl font-medium">INR</span></p>
            <p className="text-md text-gray-600 font-medium">One-time payment for self-led access</p>
            <div className="text-left mt-4">
              {selfLedFeatures.map((feature, index) => (
                <div key={index} className="flex font-medium items-center space-x-2">
                  <span className={feature.included ? 'text-main' : 'text-red-200'}>
                    {feature.included ? '✓' : '✗'}
                  </span>
                  <span>{feature.name}</span>
                </div>
              ))}
            </div>
          <Link >
          <button style={gradientStyle} onClick={handleCourseCheckout} className="px-6 py-3 rounded-md font-medium mt-4 w-52">
              Enroll now
            </button>
          </Link>
          </div>

          {/* Mentor-Driven Package */}
          <div className="w-[350px] bg-white p-6 rounded-md shadow-md flex flex-col items-center text-center space-y-4">
            <p className="text-lg font-bold text-textColor ">Mentor-Driven</p>
            <p className="text-5xl font-bold text-main ">6,500 <span className="text-2xl font-medium">INR</span></p>
            <p className="text-md text-gray-600 font-medium">Lifetime access with all features</p>
            <div className="text-left mt-4">
              {endlessLearningFeatures.map((feature, index) => (
                <div key={index} className="flex font-medium items-center space-x-2">
                  <span className="text-green-500">✓</span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <button style={gradientStyle} onClick={handleCourseCheckout} className="px-6 py-3 rounded-md font-medium mt-4 w-52">
              Enroll now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
