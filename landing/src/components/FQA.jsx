import React, { useState } from 'react';
import Pattern from '../assets/patternMask.png';

export default function FQA() {
  const faqs = [
    {
      question: "What is your return policy?",
      answer: "Our return policy allows returns within 30 days of purchase. Please make sure the item is unused and in its original condition.",
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you will receive a tracking number via email. You can use this number on our website to track your order status.",
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we offer international shipping. Shipping costs vary by destination and will be calculated at checkout.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <img src={Pattern} alt="Background" className="h-[400px] md:h-[600px] lg:h-[700px] w-full object-cover" />

      {/* Pseudo-elements for the gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-l from-white via-transparent to-transparent opacity-90 pointer-events-none" />

      {/* Content wrapper for the FAQ section */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-4 md:p-10 lg:p-20 space-y-6">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center">Frequently Asked Questions</h2>
        
        <div className="w-full max-w-xl md:max-w-2xl space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-4 py-3 md:px-6 md:py-4 bg-gray-100 hover:bg-gray-200 focus:outline-none"
              >
                <div className="flex justify-between items-center">
                  <span className="text-md md:text-lg font-medium text-gray-700">{faq.question}</span>
                  <span className="text-xl font-bold">{openIndex === index ? '-' : '+'}</span>
                </div>
              </button>
              {openIndex === index && (
                <div className="px-4 py-3 md:px-6 md:py-4 bg-white text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Additional gradient overlays if needed */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent opacity-90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-90 pointer-events-none" />
    </div>
  );
}
