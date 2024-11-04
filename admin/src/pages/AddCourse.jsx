import React, { useState } from 'react';

export default function AddCourse() {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        lessons: '',
        image: null, // Changed from video to image
    });
    const [imageName, setImageName] = useState(''); // Changed from videoName to imageName

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFormData({ ...formData, [name]: files[0] });
            setImageName(files[0].name); // Changed from videoName to imageName
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

                {/* Image Upload */}
                <div>
                    <label className="block text-gray-600 font-medium mb-1">Upload Course Image</label>
                    <div className="flex items-center justify-center w-full">
                        <label
                            htmlFor="image"
                            className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer bg-green-100 border-gray-300 hover:bg-green-200 transition duration-200"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                                </svg>

                                <p className="mb-2 text-sm text-black">
                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                </p>
                                <p className="text-xs text-black">JPEG, PNG (Max 1GB)</p>
                            </div>
                            <input
                                id="image"
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="hidden"
                            />
                        </label>
                        {imageName && (
                            <div className="ml-4 mt-2">
                                <p className="text-sm text-gray-600">
                                    Selected File: <span className="font-semibold">{imageName}</span>
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
