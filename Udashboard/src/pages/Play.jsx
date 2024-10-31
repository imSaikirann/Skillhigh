import React from 'react';
import { PlayIcon } from '@heroicons/react/24/solid';


export const Play = () => {
  return (
    <div className="flex h-screen bg-white text-black font-poppins">
      {/* Sidebar */}
      <aside className="w-1/4 bg-white p-6 flex flex-col gap-4 shadow-lg border-r-2">
        <h2 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2">Course Content</h2>
        
        {Array.from({ length: 10 }, (_, i) => (
          <button
            key={i}
            className="flex items-center gap-3 p-3 bg-main hover:bg-gray-600 rounded-lg transition-all duration-300 ease-in-out"
          >
            <PlayIcon className="w-5 h-5 text-white" />
            <span className="text-md font-medium text-white">Lesson {i + 1}</span>
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 flex items-center justify-center bg-white">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Video Player */}
          <div className="aspect-w-16 aspect-h-9 bg-black rounded-t-xl overflow-hidden">
            <video
              src="https://www.w3schools.com/html/mov_bbb.mp4" // Replace with your actual video URL
              controls
              className="w-full h-full"
            />
          </div>

          {/* Video Title and Description */}
          <div className="p-6 bg-white rounded-b-xl">
            <h3 className="text-2xl font-semibold mb-2">Lesson Title</h3>
            <p className="text-gray-400 text-sm mb-4">
              This video provides an in-depth look at the lesson's content, with examples and demonstrations.
            </p>
          <div className='flex items-center justify-between'>
          <button className="px-4 py-2 bg-main text-white rounded-lg font-semibold transition-all duration-300 ease-in-out">
              Next Lesson
            </button>
            <button className="px-4 py-2 bg-white border-2 border-main  text-main rounded-lg font-semibold transition-all duration-300 ease-in-out">
             Bookmark
            </button>
          </div>
          </div>
        </div>
      </main>
    </div> 
  );
};
