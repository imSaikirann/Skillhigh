import React from 'react';
import banner1 from '../assets/Banner.png';
import banner2 from '../assets/Banner1.png';

export default function VisionMission() {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
    color: 'white',
    textAlign: 'center',
  };
  return (
    <div className="flex flex-col p-6 font-inter space-y-8 sm:space-y-12">
      {/* Vision Section */}
      <div  className="flex flex-col md:flex-row items-center gap-6 md:gap-0">
        <div style={gradientStyle} className="flex flex-col w-full md:w-1/2 h-auto items-center md:items-start justify-center text-left rounded-l-lg font-semibold text-gray-700 p-6 space-y-4">
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl">Our Vision</h2>
          <p className="text-sm sm:text-base lg:text-lg">
          Our vision is to bridge the gap between academia and industry by promoting a community of skilled professionals who are job-ready and empowered to succeed. We believe that with the right tools, resources, and mentorship, everyone has the potential to succeed in their chosen fields.
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
        <div style={gradientStyle} className="flex flex-col w-full md:w-1/2 h-auto items-center md:items-start justify-center rounded-r-lg text-left font-semibold text-gray-700 p-6 space-y-4">
          <h2 className="font-bold text-2xl sm:text-3xl lg:text-4xl">Our Mission</h2>
          <p className="text-sm sm:text-base lg:text-lg">
          At SkillHigh, we are committed to being your affordable and trusted learning partner worldwide. We equip you with essential practical skills and hands-on experience that prepare you to confidently step into the professional world, ready to make an impact and excel in your career.

          </p>
        </div>
      </div>
    </div>
  );
}
