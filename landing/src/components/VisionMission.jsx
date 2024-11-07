import React from 'react';
import banner1 from '../assets/Banner.png';
import banner2 from '../assets/Banner1.png';

export default function VisionMission() {
  return (
    <div className="flex flex-col p-6 font-inter space-y-8 sm:space-y-12">
      {/* Vision Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-0">
        <div className="bg-border flex flex-col w-full md:w-1/2 h-auto items-center md:items-start justify-center text-left font-semibold text-gray-700 p-6 space-y-4">
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl">Our Vision</h2>
          <p className="text-sm sm:text-base lg:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat quisque ut interdum tincidunt duis.
          </p>
        </div>
        <div className="w-full md:w-1/2">
          <img
            src={banner1}
            alt="Vision Image"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Mission Section */}
      <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-0">
        <div className="w-full md:w-1/2">
          <img
            src={banner2}
            alt="Mission Image"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="bg-border flex flex-col w-full md:w-1/2 h-auto items-center md:items-start justify-center text-left font-semibold text-gray-700 p-6 space-y-4">
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl">Our Mission</h2>
          <p className="text-sm sm:text-base lg:text-lg">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat quisque ut interdum tincidunt duis.
          </p>
        </div>
      </div>
    </div>
  );
}
