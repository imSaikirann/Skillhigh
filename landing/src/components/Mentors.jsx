import React, { useEffect, useState } from "react";
import axios from "../auth/axiosConfig";

export default function Mentors() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    async function fetchMentors() {
      const res = await axios.get('/api/v1/mentors/mentors');
      console.log(res.data);
      setMentors(res.data);
    }
    fetchMentors();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-16 font-inter bg-gray-50">
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-12 text-center">
        Meet Our Mentors
      </h1>

      {/* Scrolling Wrapper */}
      <div className="relative w-full overflow-hidden">
        <div
          className="flex animate-scroll space-x-3"
          style={{
            animation: "scroll 25s linear infinite",
          }}
        >
          {/* Duplicating mentors for continuous loop */}
          {[...mentors, ...mentors].map((mentor, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-64 sm:w-72 md:w-80 lg:w-96 h-80 sm:h-96 rounded-2xl  overflow-hidden shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-transform duration-300"
            >
              {/* Image */}
              <img
                src={mentor.photo}
                alt={`${mentor.name}`}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90"></div>
              {/* Text */}
              <div className="absolute bottom-6 left-4 right-4 sm:bottom-8 sm:left-6 sm:right-6 space-y-2 text-center text-white">
                <h3 className="font-bold text-lg sm:text-xl">{mentor.name}</h3>
                <p className="text-xs sm:text-sm md:text-base">{mentor.qualification}</p>
                <p className="text-xs sm:text-sm md:text-base">{mentor.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styling */}
      <style jsx>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .animate-scroll {
            display: flex;
            white-space: nowrap;
            will-change: transform;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
        `}
      </style>
    </div>
  );
}
