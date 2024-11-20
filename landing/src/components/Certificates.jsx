import React, { useState } from "react";
import Appreciation from '../assets/certificate_of_appreciation.png';
import IndustrialTraining from '../assets/certificate_of_industrail_training.png';
import GoldBlueProfessional from '../assets/Gold_Blue_Professional_Seminar_Certificate.png';

export default function Certificates() {
  const [selectedImage, setSelectedImage] = useState("appreciation");

  // Images corresponding to buttons
  const images = {
    appreciation: Appreciation,
    training: IndustrialTraining,
    seminar: GoldBlueProfessional,
  };

  // Button labels and image keys
  const certificates = [
    { key: "appreciation", label: "Certificate of Appreciation" },
    { key: "training", label: "Industrial Training Certificate" },
    { key: "seminar", label: "Professional Seminar Certificate" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen  font-inter ">
      <div className="flex flex-col md:flex-row gap-8 p-8 bg-white shadow-2xl rounded-lg">
        {/* First Box: Buttons */}
        <div className="flex flex-col gap-6 w-full md:w-1/3">
          <h2 className="text-2xl font-bold text-gray-700 text-center ">
            Select a Certificate
          </h2>
          {certificates.map((cert) => (
            <button
              key={cert.key}
              onClick={() => setSelectedImage(cert.key)}
              className={`py-3 px-6 rounded-lg shadow-lg text-lg font-semibold transition-colors ${
                selectedImage === cert.key
                  ? "bg-main text-white"
                  : "bg-white text-main border-2 border-main"
              }`}
            >
              {cert.label}
            </button>
          ))}
        </div>

        {/* Second Box: Image Display */}
        <div className="flex justify-center items-center border-4 border-gray-200 rounded-lg p-6 bg-gray-50 shadow-inner w-full md:w-2/3">
          <img
            src={images[selectedImage]}
            alt={certificates.find((cert) => cert.key === selectedImage)?.label}
            className="max-w-full h-auto rounded-md shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
