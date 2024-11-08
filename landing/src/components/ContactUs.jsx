import React from 'react';

const gradientStyle = {
  backgroundImage: 'linear-gradient(to right, #0D8267, #044233)', 
  color: 'white',
  textAlign: 'center',
};

export default function ContactUs() {
  return (
    <div className="flex flex-col lg:flex-row justify-around items-center p-6 font-inter">
      
      {/* Flex 1: Intro Text */}
      <div className="lg:w-1/3 mb-8 lg:mb-0 lg:text-left">
     

        <h1
            className="text-5xl font-bold text-gray-800 mb-4  text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(to right, #0D8267, #044233)',
              backgroundSize: '100%',
              backgroundRepeat: 'repeat',
            }}
          >
            Get in touch
          </h1>
        <p className="text-gray-600">
          Nullam risus blandit ac aliquam justo ipsum. Quam mauris volutpat massa dictumst amet. Sapien tortor lacus arcu.
        </p>
      </div>
      
      {/* Flex 2: Contact Form */}
      <div className="w-full max-w-lg bg-white rounded-lg border border-gray-300 p-8 space-y-6">
        <h2 className="text-2xl font-bold text-left text-gray-800">Contact Us</h2>
        <p className="text-gray-600 text-left">We'd love to hear from you! Please fill out the form below.</p>
        
        <form className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="w-full sm:w-1/2">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-border"
                placeholder="Your Name"
              />
            </div>

            <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-border"
                placeholder="Your Email"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-border"
              placeholder="Phone Number"
            />
          </div>

          <div>
            <label className="block text-gray-700">Message</label>
            <textarea
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-border"
              placeholder="Your Message"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            style={gradientStyle}
            className="w-full px-4 py-3 text-white  rounded-md focus:outline-none focus:ring focus:ring-border"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
