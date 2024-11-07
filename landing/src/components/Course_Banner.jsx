import React from 'react';
import Wave from '../assets/wave.png';
import AI from '../assets/AI.png';

export default function Course_Banner() {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Background Image */}
      <img
        src={Wave}
        alt="Background"
        className="w-full h-[600px] sm:h-[700px] md:h-[500px] lg:h-[600px] object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-80 pointer-events-none" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 lg:px-16 z-10 space-y-6 md:space-y-0">
        
        {/* Text Section */}
        <div className="flex flex-col items-start md:items-start md:text-left w-full md:w-1/2 lg:w-3/5 space-y-4 mt-6 font-inter">
          <div className="px-4 py-2 rounded-full text-main bg-border text-sm font-medium w-auto md:w-max">
            Artificial Intelligence
          </div>
          <h1 className="text-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
            Basics of Artificial Intelligence
          </h1>
          <p className="text-black text-md sm:text-lg md:text-lg lg:text-lg mt-3 mb-4 w-full">
            Delve into the technical depths of AI with this advanced course, focusing on cutting-edge AI technologies such as neural networks, deep learning, and reinforcement learning.
          </p>

          {/* Features List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-black text-md sm:text-lg lg:text-lg mt-3">
            {[
              "Lifetime Membership",
              "3+ Real-World Projects",
              "Expert-Led Live Guidance",
              "Internship Completion Certification",
              "Career Support and Placement Services",
              "60 Days Program",
              "Periodic Skills Assessment"
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <span className="text-green-500">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Enroll Button */}
          <div className="flex justify-center md:justify-start gap-4 mt-6">
            <button className="bg-main px-8 py-2 md:px-6 md:py-4 rounded-md text-white font-medium text-sm md:text-base">
              Enroll now
            </button>
          </div>
        </div>

        {/* AI Image */}
        <img
          src={AI}
          alt="AI Illustration"
          className="w-4/5 sm:w-3/5 md:w-1/2 lg:w-1/3 h-auto object-contain"
        />
      </div>
    </div>
  );
}
