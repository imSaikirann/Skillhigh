import React from 'react';
import Mentor from '../assets/Cofounder.jpg';

export default function Mentors() {
  const mentors = [
    { name: 'Lakshmana', qualification: "Graduate Engineer Trainee", company: "ZF", phoneImage: Mentor },
  ];

  return (
    <div className='flex flex-col items-center justify-center'>
          <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-6 drop-shadow-md text-center md:text-left">
        Meet Our Mentor
      </h1>
      <div className="  grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
    
    {mentors.map((mentor, index) => (
      <div key={index} className="relative w-full max-w-xs mx-auto rounded-lg overflow-hidden shadow-lg">
        <img
          src={mentor.phoneImage}
          alt={`${mentor.name} phone`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-16 left-4 text-white font-inter font-bold text-2xl bg-opacity-50 p-2 rounded-lg z-10">
          {mentor.name}
        </div>
        <div className="absolute bottom-12 left-4 text-white text-sm bg-opacity-50 p-2 rounded-lg z-10">
          {mentor.qualification}
        </div>
        <div className="absolute bottom-8 left-4 text-white text-sm bg-opacity-50 p-2 rounded-lg z-10">
          {mentor.company}
        </div>
      </div>
    ))}
  </div>
    </div>
  
  );
}
