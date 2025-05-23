import React from 'react';
import {
  FaRegUser,
  FaCloudUploadAlt,
  FaMicroscope,
  FaHeartbeat,
} from 'react-icons/fa';
import { MdMedicalInformation } from 'react-icons/md';
import HeroSection from './HeroSection';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white text-gray-800">
      <HeroSection />

      {/* Features Section */}
      <section className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">
          Why Use DermAI?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: <FaRegUser className="text-blue-600 text-4xl mb-3" />,
              title: 'Secure Login',
              desc: 'Access the platform with protected login and authentication.',
            },
            {
              icon: <FaCloudUploadAlt className="text-blue-600 text-4xl mb-3" />,
              title: 'Upload & Analyze',
              desc: 'Easily upload skin images for fast and intelligent AI evaluation.',
            },
            {
              icon: <FaMicroscope className="text-blue-600 text-4xl mb-3" />,
              title: 'AI Detection',
              desc: 'Our advanced model assesses cancer probability within seconds.',
            },
            {
              icon: <MdMedicalInformation className="text-blue-600 text-4xl mb-3" />,
              title: 'Actionable Results',
              desc: 'Receive a probability score and next-step suggestions.',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-blue-50 p-6 rounded-2xl text-center hover:shadow-lg transition-all"
            >
              <div className="flex justify-center">{item.icon}</div>
              <h3 className="text-lg font-semibold text-blue-800 mt-3 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gradient-to-br from-white to-blue-50 py-20 px-6">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
          How It Works
        </h2>
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            'Register or Login to get started.',
            'Upload a clear image of your skin area.',
            'Our AI model analyzes it instantly.',
            'View the risk percentage and next steps.',
          ].map((text, i) => (
            <div
              key={i}
              className="bg-white border border-blue-100 p-6 rounded-xl text-center shadow-sm"
            >
              <div className="w-10 h-10 mx-auto mb-4 flex items-center justify-center bg-blue-600 text-white font-bold rounded-full">
                {i + 1}
              </div>
              <p className="text-sm text-gray-700">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-6">
        &copy; {new Date().getFullYear()} DermAI. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
