import React, { useState } from 'react';
import Pattern from '../assets/patternMask.png';

export default function FQA() {
  const faqs = [
    {
      question: "What makes SkillHigh different from other online learning platforms?",
      answer: "SkillHigh focuses on real-world projects and hands-on training designed to make you job-ready and prepared for real industry challenges.",
    },
    {
      question: "Are there any prerequisites for enrolling in the programs?",
      answer: "Most of our programs are beginner-friendly, but we also offer advanced courses for experienced learners. Specific requirements, if any, are listed in each course description.",
    },
    {
      question: "How are the courses structured?",
      answer: "Courses combine video lessons, interactive assignments, and project-based assessments. You'll have access to expert mentors and a community of learners.",
    },
    {
      question: "What kind of certification will I receive?",
      answer: "Upon completing a program, you'll earn a certificate that can be shared on LinkedIn and included in your resume.",
    },
    {
      question: "Can I learn at my own pace?",
      answer: "Absolutely! Our programs are designed to be flexible, allowing you to learn at your own pace. You can access course materials anytime and anywhere, tailoring your learning schedule to fit your life.",
    },
    {
      question: "How do I access my courses after enrolling?",
      answer: "After enrolling, you'll receive immediate access to your course materials through your account. Log in and start learning!",
    },
    {
      question: "Can I take multiple courses at the same time?",
      answer: "Yes, you can enroll in multiple courses at the same time. Feel free to explore various topics and develop a diverse skill set that aligns with your career goals.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative bg-white overflow-hidden ">
      <img src={Pattern} alt="Background" className="h-[760px] md:h-[900px] lg:h-[900px] w-full object-cover" />

      {/* Pseudo-elements for the gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-90 pointer-events-none transition-opacity duration-700 delay-200" />
      <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-transparent opacity-90 pointer-events-none transition-opacity duration-700 delay-200" />

      {/* Content wrapper for the FAQ section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 md:p-10 lg:p-20 space-y-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center">Frequently Asked Questions</h2>
        
        <div className="w-full max-w-xl md:max-w-2xl space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden transition-all duration-500 ease-in-out transform hover:scale-105"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-4 py-3 md:px-6 md:py-4 bg-gray-100 hover:bg-gray-200 focus:outline-none transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex justify-between items-center">
                  <span className="text-md md:text-lg font-medium text-gray-700">{faq.question}</span>
                  <span
                    className={`text-xl font-bold transform transition-transform duration-500 ${
                      openIndex === index ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    {openIndex === index ? '-' : '+'}
                  </span>
                </div>
              </button>
              {openIndex === index && (
                <div
                  className="px-4 py-3 md:px-6 md:py-4 bg-white text-gray-600 transition-all duration-500 ease-in-out transform origin-top"
                  style={{
                    maxHeight: openIndex === index ? '300px' : '0px',
                    opacity: openIndex === index ? 1 : 0,
                    transform: openIndex === index ? 'scaleY(1)' : 'scaleY(0)',
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional gradient overlays with smoother transitions */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-90 pointer-events-none transition-opacity duration-700 delay-200" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90 pointer-events-none transition-opacity duration-700 delay-200" />
    </div>
  );
}
