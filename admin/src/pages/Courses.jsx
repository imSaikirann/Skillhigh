import React from 'react';
import CourseCard from '../components/CourseCard'; // Adjust the import path as necessary

const courseData = [
  {
    title: 'AI & ML Basics',
    description: 'Learn the fundamentals of Artificial Intelligence and Machine Learning.',
    image: 'path/to/your/image.jpg', // Replace with actual image path
  },
  {
    title: 'Advanced AI Techniques',
    description: 'Dive deeper into advanced AI techniques and applications.',
    image: 'path/to/your/image.jpg', // Replace with actual image path
  },
  // Add more courses as needed
];

export default function Courses() {
  return (
    <div className="p-8 pl-80">
      <h1 className="text-3xl font-semibold mb-4">Courses</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courseData.map((course, index) => (
          <CourseCard key={index} {...course} />
        ))}
      </div>
    </div>
  );
}
