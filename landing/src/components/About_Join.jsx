import React from 'react';
import pattern from '../assets/pm.png';

export default function About_Join() {
  return (
    <div className="relative bg-white overflow-hidden font-inter">
      {/* Background Image */}
      <img
        src={pattern}
        alt="Background"
        className="h-[1200px] md:h-[900px] lg:h-[1000px] object-cover w-full"
      />

      {/* Content wrapper */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
        {/* Text content */}
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="text-black text-2xl md:text-3xl lg:text-5xl font-bold mb-2 md:mb-4">
            Join SkillHigh Today
          </h1>
          <p className="text-black text-md md:text-lg lg:text-xl mt-3 mb-4 max-w-2xl">
            Install our top-rated dropshipping app to your e-commerce site and get access to US Suppliers, AliExpress vendors, and the best.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full">
          {/* Grid Item 1 */}
          <div className=" p-6 bg-border rounded-lg shadow-md">
            <img></img>
            <h2 className="text-lg font-semibold mb-2">Row 1, Col 1</h2>
            <p className="text-md">Content for the first grid item goes here. Add your details or description.</p>
          </div>

          {/* Grid Item 2 */}
          <div className="bg-white p-6 border-2 border-gray-200 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Row 1, Col 2</h2>
            <p className="text-md">Content for the second grid item goes here. Add your details or description.</p>
          </div>

          {/* Grid Item 3 */}
          <div className="bg-white p-6 border-2 border-gray-200 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Row 2, Col 1</h2>
            <p className="text-md">Content for the third grid item goes here. Add your details or description.</p>
          </div>

          {/* Grid Item 4 */}
          <div className="bg-white p-6 border-2 border-gray-200 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Row 2, Col 2</h2>
            <p className="text-md">Content for the fourth grid item goes here. Add your details or description.</p>
          </div>

          {/* Grid Item 5 */}
          <div className="bg-white p-6 border-2 border-gray-200 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Row 3, Col 1</h2>
            <p className="text-md">Content for the fifth grid item goes here. Add your details or description.</p>
          </div>

          {/* Grid Item 6 */}
          <div className="bg-white p-6 border-2 border-gray-200 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Row 3, Col 2</h2>
            <p className="text-md">Content for the sixth grid item goes here. Add your details or description.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
