import React from 'react';
import Content from '../assets/Content.png';
import HeroIM from '../assets/hero.png';

export default function Hero() {
  return (
    <div className="relative bg-white overflow-hidden ">
      <img
        src={Content}
        alt="Background"
        className="h-[700px] object-cover"
      />

      {/* Pseudo-elements for the gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-transparent opacity-90 pointer-events-none" />

      {/* Content wrapper to keep text and image above the gradients */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:text-left z-10 px-4 md:px-10 lg:px-20">
        <div className="flex flex-col mb-6 md:mb-0 md:mr-8 lg:mr-16">
          <h1 className="text-black text-2xl md:text-3xl lg:text-5xl font-bold mb-2 md:mb-4">
            Empower Your Future with
          </h1>
          <h1 className="text-main text-2xl md:text-3xl lg:text-5xl font-bold mb-2 md:mb-4">
            Quality Education
          </h1>
          <p className="text-black text-md md:text-lg lg:text-xl mt-3 mb-4 max-w-md">
            Join our community of learners and take the first step towards achieving your academic goals.
          </p>

          <div className="flex flex-row gap-4 md:gap-6">
            <button className="bg-main px-4 py-2 md:px-6 md:py-3 rounded-md text-white font-medium text-sm md:text-base">
              Get Started
            </button>
            <button className="border-2 border-border px-4 py-2 md:px-6 md:py-3 rounded-md font-medium text-sm md:text-base">
              Learn more
            </button>
          </div>
        </div>

        {/* Responsive hero image */}
        <img
          src={HeroIM}
          alt="Hero Illustration"
          className="w-4/5 md:w-1/2 lg:w-1/3 h-auto object-cover"
        />
      </div>

      {/* Additional gradient overlays if needed */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90 pointer-events-none" />
    </div>
  );
}
