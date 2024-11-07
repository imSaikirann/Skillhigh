import React from 'react';
import Stars from '../assets/stars.png';
import Cofounder from '../assets/Cofounder.jpg';
import Founder from '../assets/founder.jpg';
import Linkedin from '../assets/Linkedin.png';


function Card({ image, title, role, description }) {
  return (
    <div className="bg-white border-2 border-gray-300 rounded-xl p-6 flex flex-col items-center gap-4 shadow-lg transition-transform transform hover:scale-105 font-inter max-w-xs">
      <img
        src={image}
        alt={title}
        className="w-32 h-32 rounded-full object-cover shadow-md"
      />
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      <h3 className="text-md font-medium text-gray-600">{role}</h3>
      <img src={Linkedin}></img>
      <p className="text-sm text-gray-600 text-center">{description}</p>
     
    </div>
  );
}

export default function AboutMentors() {
  return (
    <div
      className="relative  bg-cover bg-center font-inter"
      style={{
        backgroundImage: `url(${Stars})`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 "></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 ">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Meet Our Team</h1>
        <p className="mt-4 text-lg md:text-xl text-black w-full md:w-2/3 lg:w-1/2">
          Our team is driven by passion and expertise, delivering excellence in every endeavor.
        </p>

        {/* Cards Section */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8">
          <Card
            image={Founder}
            title="John Doe"
            role="CEO & Founder"
            description="With a vision to lead, John has transformed the company into an industry leader."
          />
          <Card
            image={Cofounder}
            title="Jane Smith"
            role="COO & Cofounder"
            description="Jane brings operational expertise, driving the company's success with strategic planning."
          />
        </div>
      </div>
    </div>
  );
}
