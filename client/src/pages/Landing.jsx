import React from 'react';
import {
  FaRegUser,
  FaCloudUploadAlt,
  FaMicroscope,
  FaHeartbeat,
} from 'react-icons/fa';
import { MdMedicalInformation } from 'react-icons/md';
import HeroSection from './HeroSection';
import { HiUserAdd, HiPhotograph, HiChip, HiEye } from 'react-icons/hi';


const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white text-gray-800">
      <HeroSection />

      <section className="flex flex-col items-center justify-center bg-white py-20 px-6 min-h-screen">
  <h2 className="text-4xl font-extrabold text-center text-blue-900 mb-16 max-w-3xl leading-snug">
    Why Choose <span className="text-blue-700">DermAI</span> for Skin Cancer Detection?
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl w-full mx-auto px-4">
    {[
      {
        icon: <FaRegUser className="text-blue-600 text-5xl mb-4" />,
        title: 'Secure & Private Access',
        desc: 'Your health data is protected with robust authentication and encrypted login, ensuring full privacy and security.',
      },
      {
        icon: <FaCloudUploadAlt className="text-blue-600 text-5xl mb-4" />,
        title: 'Effortless Image Upload',
        desc: 'Upload your skin images quickly with drag-and-drop or file selection, designed for convenience on any device.',
      },
      {
        icon: <FaMicroscope className="text-blue-600 text-5xl mb-4" />,
        title: 'Accurate AI-Powered Analysis',
        desc: 'Our cutting-edge AI model evaluates your images with high precision to identify potential skin cancer risks instantly.',
      },
      {
        icon: <MdMedicalInformation className="text-blue-600 text-5xl mb-4" />,
        title: 'Clear & Actionable Insights',
        desc: 'Get a detailed risk score and personalized recommendations to help you take the next steps confidently.',
      },
    ].map((item, i) => (
      <div
        key={i}
        className="bg-gradient-to-tr from-blue-50 to-white p-8 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
      >
        <div className="mb-4">{item.icon}</div>
        <h3 className="text-xl font-semibold text-blue-800 mb-3">{item.title}</h3>
        <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
      </div>
    ))}
  </div>
</section>



     {/* How It Works Section */}
<section className="flex flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50 py-24 px-8 min-h-screen">
  <h2 className="text-4xl sm:text-5xl font-extrabold text-center text-blue-900 mb-20 max-w-3xl mx-auto leading-tight">
    How <span className="text-blue-700">DermAI</span> Works
  </h2>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl w-full mx-auto px-6">
    {[
      {
        step: 1,
        icon: <HiUserAdd className="text-blue-600 text-4xl sm:text-5xl" />,
        title: 'Register or Login.',
        desc: 'Use your basic details to register or login to the app.',
      },
      {
        step: 2,
        icon: <HiPhotograph className="text-blue-600 text-4xl sm:text-5xl" />, 
        title: 'Upload a clear image of your skin area.',
        desc: 'Upload a clear image of your skin area to get started.',
      },
      {
        step: 3,
        icon: <HiChip className="text-blue-600 text-4xl sm:text-5xl" />,
        title: 'Our AI model analyzes it instantly.',
        desc: 'Our AI model analyzes the image and gives you the result.',
      },
      {
        step: 4,
        icon: <HiEye className="text-blue-600 text-4xl sm:text-5xl" />,
        title: 'View the risk percentage and next steps.',
        desc: 'View the risk percentage and next steps.',
      },
    ].map((item, i) => (
      <div
        key={i}
        className="bg-gradient-to-tr from-blue-50 to-white p-10 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center"
      >
        <div className="mb-6">{item.icon}</div>
        <h3 className="text-md sm:text-lg font-semibold text-blue-800 mb-4">{item.title}</h3>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed max-w-[280px]">
          {item.desc}
        </p>
      </div>
    ))}
  </div>
</section>


    </div>
  );
};

export default Landing;
