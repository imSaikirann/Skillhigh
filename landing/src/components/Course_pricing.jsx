import React from 'react';
import Wave from '../assets/wave.png';

export default function CoursePricing() {
  return (
    <div className="relative bg-white overflow-hidden  mt-5">
      {/* Background Image */}
      <img
        src={Wave}
        alt="Background Wave"
        className="w-full h-[1000px] md:h-[500px] lg:h-[600px] object-cover"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-black p-4">
        
        {/* Hero Content */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Pricing to Enroll in this program</h1>
          <p className="mt-4 text-lg md:text-xl w-full">
            If you're not satisfied, contact us within the first 14 days, and we'll send you a full refund.
          </p>
        </div>

        {/* Pricing Section */}
        <div className="flex flex-col sm:flex-row gap-6 mt-12 items-center justify-center">
          {/* Pricing Details */}
          <div className="px-8 md:px-16 lg:px-24 space-y-6 text-center sm:text-left">
            <h2 className="text-2xl font-semibold">Lifetime Access</h2>
            <p className="text-md md:text-lg text-gray-700 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque amet indes perferendis blanditiis repellendus et quidem assumenda.
            </p>

            {/* What's Included */}
            <div className="flex items-center gap-2 mb-4">
              <h3 className="text-xl font-semibold">What's included</h3>
             
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                "Access to all the course material",
                "Internship & Placement Opportunities",
                "Doubt-solving sessions with mentors",
                "Course Completion Certificate"
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2 ">
                  <span className="text-green-500">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Box */}
          <div className="w-[300px] h-[300px] bg-white p-6 rounded-md shadow-md flex flex-col items-center justify-between text-center">
            <p className="text-lg font-semibold">Pay once, own it forever</p>
            <p className="text-5xl font-bold">
              3499 <span className="text-2xl font-medium">INR</span>
            </p>
            <p className="text-sm text-gray-600">Learn about our membership policy</p>
            <button className="bg-main text-white px-6 py-3 rounded-md font-medium mt-4">
              Enroll now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
