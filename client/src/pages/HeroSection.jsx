import React from 'react';
import {
  FaMicroscope,
  FaHeartbeat,
  FaRobot,
  FaUserMd,
  FaHospital,
  FaBandAid,
  FaNotesMedical,
} from "react-icons/fa";

const floatingVariants = {
  float: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const spinSlow = {
  spin: {
    rotate: [0, 360],
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100">

      {/* Floating Background Icons - Better distributed */}
      <motion.div
        variants={floatingVariants}
        animate="float"
        className="absolute top-16 left-10 text-blue-400 text-5xl sm:text-6xl z-0 opacity-50"
      >
        <FaMicroscope />
      </motion.div>

      <motion.div
        variants={floatingVariants}
        animate="float"
        className="absolute top-28 right-24 text-blue-400 text-4xl sm:text-5xl z-0 opacity-60"
      >
        <FaHeartbeat />
      </motion.div>

      <motion.div
        variants={spinSlow}
        animate="spin"
        className="absolute top-1/3 left-1/2 -translate-x-1/2 text-blue-300 text-7xl sm:text-8xl z-0 opacity-40"
      >
        <FaRobot />
      </motion.div>

      <motion.div
        variants={floatingVariants}
        animate="float"
        className="absolute bottom-28 right-12 text-blue-500 text-5xl sm:text-6xl z-0 opacity-50"
      >
        <FaUserMd />
      </motion.div>

      <motion.div
        variants={floatingVariants}
        animate="float"
        className="absolute bottom-24 left-1/3 text-blue-400 text-5xl sm:text-6xl z-0 opacity-40"
      >
        <FaHospital />
      </motion.div>

      <motion.div
        variants={floatingVariants}
        animate="float"
        className="absolute top-1/2 left-16 text-blue-400 text-4xl sm:text-5xl z-0 opacity-30"
      >
        <FaBandAid />
      </motion.div>

      <motion.div
        variants={floatingVariants}
        animate="float"
        className="absolute bottom-20 left-3/4 text-blue-300 text-4xl sm:text-5xl z-0 opacity-25"
      >
        <FaNotesMedical />
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 sm:py-24 flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16">
        {/* Left Text Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left md:w-2/3"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-blue-900 mb-6 leading-tight tracking-tight">
            Welcome to <span className="text-blue-600">DermAI</span>
          </h1>
          <p className="text-lg sm:text-xl font-medium text-gray-700 mb-4">
            Your AI companion to know your skin & guard you from within.
          </p>
          <p className="text-base sm:text-lg text-gray-700 mb-4 leading-relaxed">
            Skin cancer often hides in plain sight. DermAI helps you detect it early with fast, reliable AI analysis — before it’s too late.
          </p>
          <p className="text-sm sm:text-base text-gray-600 mb-8">
            Just upload a skin image and get instant insights. No stress, no waiting — just smarter care.
          </p>
          <a
            href="/register"
            className="inline-block bg-blue-600 hover:bg-blue-700 transition-all px-6 py-3 text-white rounded-full text-base sm:text-lg font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Start Your Scan – It’s Free
          </a>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/3 mb-10 md:mb-0"
        >
          <img
            src="/hero-image.webp"
            alt="AI-powered skin analysis"
            className="w-full max-w-md mx-auto drop-shadow-2xl rounded-3xl opacity-80"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
