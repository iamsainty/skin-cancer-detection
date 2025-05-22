const Landing = () => {
    return (
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4 text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-900 mb-4">Welcome to <span className="text-blue-600">DermAI</span></h1>
          <p className="text-lg sm:text-xl text-gray-700 mb-6">
            Detect early signs of skin cancer using smart image analysis. Upload your skin images and let AI assist in risk evaluation.
          </p>
          <a
            href="/register"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-2xl shadow-md hover:bg-blue-700 transition"
          >
            Start Detection
          </a>
        </div>
      </section>
    );
  };
  
  export default Landing;
  