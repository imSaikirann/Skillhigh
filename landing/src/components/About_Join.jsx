import React from 'react';
import pattern from '../assets/pm.png';
import Cost from '../assets/reducedcost.png';



export default function AboutJoin() {
  return (
    <div className="relative overflow-hidden font-inter">
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
            Install our top-rated dropshipping app to your e-commerce site and gain access to US suppliers, AliExpress vendors, and more.
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 w-full max-w-5xl">
          {/* Grid Items */}
          {[
            { title: "Standardization", content: "When working in a global workplace, it’s often difficult to gauge learners’ training." },
            { title: "Reduced Costs", content: "With Weekend UX, there’s no cost to reproduce materials, thanks to mobile accessibility." },
            { title: "More Customization", content: "Learning isn’t a one-size-fits-all experience, and customization is key." },
            { title: "Affordable Pricing", content: "Weekend UX reduces material costs, utilizing mobile learning and microlearning." },
            { title: "Learner Satisfaction", content: "High learner satisfaction is crucial for better knowledge retention." },
            { title: "Multimedia Materials", content: "Custom eLearning is effective as it uses diverse delivery methods." },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-border rounded-lg shadow-md flex flex-col items-center justify-center text-center"
            >
              <img src={Cost}></img>
              <h2 className="text-lg font-semibold mb-2">{item.title}</h2>
              <p className="text-md">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
