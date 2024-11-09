import React, { useState } from "react";

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
    name: "Harini kurella - Mallareddy Engineering college",
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
  {
    id: 7,
    name: "Ankita Yadav - Amity University Raipur",
    feedback:
      "Interning at SkillHigh allowed me to work on real-world projects with the mentorship of skilled professionals. I will always thank the team's dedication to growth that not only made it an inspiring experience but also rewarding.",
  },
  {
    id: 8,
    name: "Varun Tankala - Sathyabama Institute of Science and Technology",
    feedback:
      "I am really thankful to the internship experience of SkillHigh where I deal with challenging projects and got great guidance by industry experts. It has been helpful because the teamwork supports and encourages each day with valuable steps in my career journey.",
  },
  {
    id: 9,
    name: "Kanchanapally Uday - Kakatiya University College of Engineering and Technology",
    feedback:
      "My internship experience with SkillHigh was highly formative, allowing me to contribute to impactful projects as part of a talented team. Truly invaluable mentorship accompanied me through it all, and I am thankful for the skills and insight I garnered.",
  },
  {
    id: 10,
    name: "Matcha Naveen - Aurora's Scientific and Technological Institute",
    feedback:
      "My internship experience at SkillHigh was incredibly enriching. Working on real-world projects and receiving guidance from knowledgeable mentors allowed me to develop my skills and confidence. I’m grateful to the entire team for making my journey so impactful.",
  },
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate number of cards based on window width
  const isLargeScreen = window.innerWidth >= 768;
  const cardsToShow = isLargeScreen ? 2 : 1;

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex + cardsToShow) % testimonials.length
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - cardsToShow + testimonials.length) % testimonials.length
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-2 h-auto font-inter">
      <h2 className="text-4xl font-bold text-center text-black mb-6">
        Hear from Our Achievers
      </h2>

      <div className={`grid gap-6 ${isLargeScreen ? 'grid-cols-2' : 'grid-cols-1'}`}>
        {/* Render testimonials based on screen size */}
        {testimonials
          .slice(currentIndex, currentIndex + cardsToShow)
          .map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative bg-white shadow-lg rounded-lg p-6 text-center"
            >
              <div className="border-l-4 border-border pl-8 pr-8 py-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  {testimonial.name}
                </h3>
                <p className="text-gray-600 italic">
                  "{testimonial.feedback}"
                </p>
              </div>
            </div>
          ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={goToPrevious}
          className="bg-main text-white px-4 py-2 rounded-lg focus:outline-none"
        >
          Previous
        </button>
        <button
          onClick={goToNext}
          className="bg-main text-white px-4 py-2 rounded-lg focus:outline-none"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
