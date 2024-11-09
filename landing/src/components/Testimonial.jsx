import React, { useState, useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Yeshwanth - CBIT College of Engineering",
    feedback:
      "I really had an excellent working experience at the internship at SkillHigh, as I got to work on data-driven projects with expert professionals. The guidance and mentorship were good, and I do appreciate the team that created the nurturing environment where I learned.",
  },
  {
    id: 2,
    name: "Santhosh - Srinidhi Institute of Science of Technology",
    feedback:
      "I really appreciate this opportunity to be an intern at SkillHigh, where I work on impactful projects most actively. The team's mentorship and support led me through that journey, turning my internship into a very valuable experience.",
  },
  {
    id: 3,
    name: "Koundinya Goud - Manipal Institute of Technology",
    feedback:
      "It was a very enriching experience getting to intern at SkillHigh, learning through hands-on handling of real-world projects. The team really supported and guided me through the entire process, growing and learning ways I hadn't anticipated before. I am proud to have been part of such an inspiring team.",
  },
  {
    id: 4,
    name: "Harini - Malla Reddy College of Engineering",
    feedback:
      "My experience at SkillHigh was growth-oriented and leaning. The talent around me guided me through all the projects. It was difficult yet fulfilling because the journey was made memorable by a dedicated team.",
  },
  {
    id: 5,
    name: "Nithin - Dr.NSAM FGC College",
    feedback:
      "SkillHigh presented an opportunity to work on real-world projects and professional guidance through industry professionals, but also a supportive environment and team guidance that has made my internship truly impactful and a shaping experience for my career.",
  },
  {
    id: 6,
    name: "Neha - VNR VJIET",
    feedback:
      "Working with SkillHigh was not just a work experience; it was a journey of professional and personal growth. What I took away during my internship—the mentorship of the team and the projects I engaged with—teaches me some invaluable lessons, which will guide me throughout my career.",
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change testimonial every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // 3000ms = 3 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Handle next and previous testimonial navigation
  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="max-w-2xl mx-auto mt-2  h-auto font-inter">
      <div className="max-w-xl mx-auto mt-4 ">
        <h2 className="text-4xl font-bold text-center text-black mb-6">
          Hear from Our Achievers
        </h2>
        <div className="relative bg-white shadow-lg rounded-lg p-6 md:p-8 text-center">
          <div className="border-l-4 border-border pl-8 pr-8 py-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {testimonials[currentIndex].name}
            </h3>
            <p className="text-gray-600 italic">
              "{testimonials[currentIndex].feedback}"
            </p>
          </div>

          {/* Navigation Buttons with spacing adjustments */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-main text-white p-3 rounded-full focus:outline-none"
          >
            &lt;
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-main text-white p-3 rounded-full focus:outline-none"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
