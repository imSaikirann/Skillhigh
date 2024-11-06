import React from 'react';
import Three from '../assets/Three.png';

export const AboutHero = () => {
  return (
    <div className="relative h-screen bg-cover bg-center font-inter" style={{ backgroundImage: `url(${Three})` }}>
      <div className="absolute inset-0  opacity-50"></div> {/* Optional overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-semibold text-black">
          Empowering the
        </h1>
        <h1 className="mt-4 text-4xl md:text-5xl font-bold text-main">
          Next Generation of Innovators
        </h1>
        <p className="mt-4 text-xl md:text-2xl text-black w-full md:w-3/4">
          At SkillHigh, we believe in breaking down barriers to education. Join us in our mission to provide cutting-edge learning experiences that equip students with the skills they need to thrive in the modern world.
        </p>
      </div>
    </div>
  );
};
