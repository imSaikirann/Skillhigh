import React from 'react';
import Wave from '../assets/wave.png';
import Person from '../assets/person.png';

export default function Hero2() {
  return (
    <div className="relative bg-white overflow-hidden">
      {/* Background Image */}
      <img
        src={Wave}
        alt="Background"
        className="w-full h-[500px] md:h-[600px] lg:h-[700px] object-cover"
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-transparent opacity-90 pointer-events-none" />

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col-reverse md:flex-row-reverse items-center justify-between  z-10  space-y-4 md:gap-4">
        
        {/* Text Content */}
        <div className="flex flex-col mb-6 text-center md:text-left">
          <h1 className="text-black text-2xl md:text-3xl lg:text-5xl font-bold mb-2 md:mb-4">
            SkillHigh is an E-Learning Platform
          </h1>
          <p className="text-black text-md md:text-lg lg:text-xl mt-3 mb-4 w-full">
          Empower yourself with the knowledge and skills gained through online education! The key to your future! Empower yourself with the knowledge and skills gained through online education! The key to your future!
          </p>
          
          {/* Buttons */}
          <div className="flex justify-center md:justify-start gap-4 md:gap-6">
            <button className="bg-main px-10 py-2 md:px-6 md:py-3 rounded-md text-white font-medium text-sm md:text-base">
            Learn more
            </button>
           
          </div>
        </div>

        {/* Hero Image */}
        <img
          src={Person}
          alt="Hero Illustration"
          className="w-4/5 md:w-1/2 lg:w-1/3 h-auto object-contain mb-6 md:mb-0"
        />
      </div>

      {/* Additional Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90 pointer-events-none" />
    </div>
  );
}
