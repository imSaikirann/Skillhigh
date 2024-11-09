import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 h-[400px]">
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="p-8 bg-white rounded-lg transition-shadow duration-300 ease-in-out flex flex-col items-center text-center"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {testimonial.name}
            </h3>
            <p className="text-base text-gray-600 leading-relaxed italic">
              "{testimonial.feedback}"
            </p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TestimonialSlider;
