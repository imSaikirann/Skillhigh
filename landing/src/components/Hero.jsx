import React from 'react';
import Content from '../assets/Content.png';
import HeroIM from '../assets/hero.png';
import { Link } from 'react-router-dom';

export default function Hero() {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };

  return (
    <div className="relative bg-white overflow-hidden  font-inter">
      <img
        src={Content}
        alt="Background"
        className="h-[700px] object-cover"
      />

      {/* Pseudo-elements for the gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-transparent opacity-90 pointer-events-none" />

      {/* Content wrapper to keep text and image above the gradients */}
      <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:text-left z-10 px-4">
        <div className="flex flex-col mb-6 md:mb-0 ">
          <h1 className="text-black text-2xl md:text-3xl lg:text-5xl font-bold mb-2 md:mb-4">
         
          </h1>
          <h1
            className="text-4xl md:text-3xl lg:text-5xl font-bold mb-2 md:mb-4 text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
              backgroundSize: '100%',
              backgroundRepeat: 'repeat',
            }}
          >
             Gain Skills. Get Certified. Reach Higher
          </h1>

          <p className="text-black text-md md:text-lg lg:text-xl mt-2 sm:smt-3 mb-4 ">
          Where Ambition Meets Opportunity – Learn from Industry Leaders, Build Practical Skills, and Step Confidently into Your Future
          </p>

          <div className="flex flex-row gap-4 md:gap-6">
            <Link to="/courses">
              <button style={gradientStyle} className=" px-4 py-3 md:px-8 md:py-3 rounded-md text-white font-medium text-sm md:text-base">
              Get Started Now
              </button>
            </Link>

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
