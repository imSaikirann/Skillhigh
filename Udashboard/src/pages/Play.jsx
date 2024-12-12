import React, { useState } from 'react';
import { PlayIcon, Bars3Icon, Bars3BottomLeftIcon } from '@heroicons/react/24/solid';
import { gradientStyle } from '../icons/icons';

export const Play = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div className="flex flex-row-reverse h-screen bg-white dark:bg-gray-900 dark:text-white font-poppins">
      {/* Sidebar Toggle Button */}
      <button
        style={gradientStyle}
        className="fixed top-4 left-4 z-20 p-2  text-white rounded-lg md:hidden shadow-lg"
        onClick={() => setSidebarVisible(!isSidebarVisible)}
      >
        {isSidebarVisible ? (
          <Bars3BottomLeftIcon className="w-6 h-6" />
        ) : (
          <Bars3Icon className="w-6 h-6" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:relative top-0 left-0 h-screen w-64 md:w-1/4 dark:bg-gray-900 text-white transform transition-transform duration-300 shadow-lg z-10 p-6 flex flex-col gap-4 border-b md:border-b-0 md:border-r-2 overflow-y-auto ${isSidebarVisible ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
      >
        <h2 className="text-xl font-bold mb-6 border-b text-main dark:text-main pb-2">Course Content</h2>

        {Array.from({ length: 15 }, (_, i) => (
          <button
            key={i}
            className="flex items-center gap-3 p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300 ease-in-out"
          >
            <PlayIcon className="w-5 h-5 text-white" />
            <span className="text-md font-medium">Lesson {i + 1}</span>
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="w-full max-w-5xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Video Player */}
          <div className="aspect-w-16 aspect-h-9 bg-black rounded-t-xl overflow-hidden">
            <video
              src="https://d1th9tanfe1kzp.cloudfront.net/15+Minute+Timer.mp4"
              controls
              controlsList="nodownload"
              className="w-full h-full"
            />
          </div>

          {/* Video Title and Description */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-b-xl space-y-4">
            <h3 className="text-2xl font-semibold">Lesson Title</h3>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-300">Start learning now!</p>
              </div>

              <button style={gradientStyle} className="px-6 py-2 bg-main text-white rounded-lg font-semibold shadow hover:shadow-md hover:bg-main-dark transition-all duration-300 ease-in-out">
                Next Lesson
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
