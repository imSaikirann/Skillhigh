import React from 'react';
import banner1 from '../assets/Banner.png';
import banner2 from '../assets/Banner1.png';

export default function VisionMission() {
  return (
    <div className="flex flex-col p-6 font-inter space-y-4 sm:space-y-0 ">
      {/* Vision Section */}
      <div className="flex flex-col md:flex-row items-center ">
        <div className=" bg-border flex flex-col w-full md:w-[756px] h-auto md:h-[456px] items-center md:items-start justify-center text-left font-semibold text-gray-700 p-4 space-y-2">
          <h2 className='font-bold text-4xl'>Our Vision</h2>
          <p className=''>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat quisque ut interdum tincidunt duis.
          </p>
        </div>
        <div className="w-full md:w-[756px]">
          <img
            src={banner1}
            alt="Vision Image"
            className="w-full md:w-[756px] h-auto md:h-[456px] object-cover"
          />
        </div>
      </div>

      {/* Mission Section */}
      <div className="flex flex-col-reverse md:flex-row items-center ">
        <div className="w-full md:w-[756px]">
          <img
            src={banner2}
            alt="Mission Image"
            className="w-full md:w-[756px] h-auto md:h-[456px] object-cover"
          />
        </div>
        <div className="text-lg bg-border flex flex-col w-full md:w-[756px] h-auto md:h-[456px] items-center md:items-start justify-center text-left font-semibold text-gray-700 p-4 space-y-2">
          <h2 className='font-bold text-4xl'>Our Mission</h2>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Et, egestas tempus tellus etiam sed. Quam a scelerisque amet ullamcorper eu enim et fermentum, augue. Aliquet amet volutpat quisque ut interdum tincidunt duis.
          </p>
        </div>
      </div>
    </div>
  );
}
