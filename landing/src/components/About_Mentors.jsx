import React from 'react';
import Stars from '../assets/stars.png';
import MentorImage from '../assets/Avatar.png'; 

function Card({ image, title, description }) {
  return (
    <div className="bg-border border-2 border-main rounded-t-lg  p-5 flex flex-col items-center gap-6 shadow-lg">
      <img
        src={image}
        alt={title}
        className="w-32 h-32 rounded-full object-fit"
      />
      <h2 className="text-lg font-semibold text-black">{title}</h2>
      <p className="text-sm text-gray-700 text-center">{description}</p>
    </div>
  );
}

export default function About_Mentors() {
  return (
    <div
      className="relative h-screen bg-cover bg-center font-inter"
      style={{
        backgroundImage: `url(${Stars})`,
        backgroundRepeat: "repeat-x",
        backgroundSize: "auto 100%",
      }}
    >
      <div className="absolute inset-0 opacity-50"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-semibold text-black">Meet our team</h1>
        <p className="mt-4 text-xl md:text-2xl text-black w-full md:w-3/4">
          Ornare sagittis, suspendisse in hendrerit quis. Sed dui aliquet lectus sit pretium egestas vel mattis neque.
        </p>

        {/* Cards Section */}
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          <Card
            image={MentorImage}
            title="Mentor Name"
            description="Short bio of the mentor goes here. Providing expertise in specific field."
          />
          <Card
            image={MentorImage}
            title="Mentor Name"
            description="Short bio of the mentor goes here. Providing expertise in specific field."
          />
       
        </div>
      </div>
    </div>
  );
}
