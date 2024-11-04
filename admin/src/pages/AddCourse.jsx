import React, { useState } from 'react';

export default function AddCourse() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    lessons: '',
    video: null,
  });
  const [videoName, setVideoName] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
      setVideoName(files[0].name);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // You can add more logic here for submission, such as API calls.
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg font-poppins">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Course</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Course Title */}
        <div>
          <label className="block text-gray-600 font-medium mb-1" htmlFor="title">
            Course Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-600"
          />
        </div>

        {/* Course Description */}
        <div>
          <label className="block text-gray-600 font-medium mb-1" htmlFor="description">
            Course Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-600"
          ></textarea>
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-600 font-medium mb-1" htmlFor="price">
            Price (USD)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-600"
          />
        </div>

        {/* Number of Lessons */}
        <div>
          <label className="block text-gray-600 font-medium mb-1" htmlFor="lessons">
            Number of Lessons
          </label>
          <input
            type="number"
            id="lessons"
            name="lessons"
            value={formData.lessons}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-green-600"
          />
        </div>

        {/* Video Upload */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Upload Course Video</label>
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="video"
              className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-green-100 border-gray-300 hover:bg-green-200 transition duration-200"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg
                  className="w-8 h-8 mb-4 text-main"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-black">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-black">MP4, MOV (Max 1GB)</p>
              </div>
              <input
                id="video"
                type="file"
                name="video"
                accept="video/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>
            {videoName && (
              <div className="ml-4 mt-2">
                <p className="text-sm text-gray-600">
                  Selected File: <span className="font-semibold">{videoName}</span>
                </p>
                <p className="text-xs text-gray-500">Make sure it's the correct file.</p>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-main text-white font-semibold py-2 rounded-md transition duration-200 hover:bg-green-600"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
}
