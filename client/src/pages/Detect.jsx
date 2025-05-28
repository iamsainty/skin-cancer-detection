import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUploadCloud } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Detect = () => {
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [detectionCompleted, setDetectionCompleted] = useState(false);
  const [cancerChance, setCancerChance] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const resultRef = useRef(null);
  const serverUrl = "https://derm-ai-server.vercel.app";
  useEffect(() => {
    if (!token) navigate('/');
  }, [navigate, token]);

  const handleDrop = e => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setErrorMsg('');
    } else {
      setErrorMsg("Invalid file type. Please upload an image.");
    }
  };

  const handleDragOver = e => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => setDragActive(false);

  const handleChange = e => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
      setErrorMsg('');
    } else {
      setErrorMsg("Invalid file type. Please upload an image.");
    }
  };

  const handleUpload = async () => {
    if (!image) return setErrorMsg("Please select an image first.");
    setLoading(true);
    setErrorMsg('');

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(`${serverUrl}/api/detect/detectcancer`, {
        method: "POST",
        headers: { token },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setImageUrl(data.imageUrl);
        setCancerChance(data.cancerChance);
        setDetectionCompleted(true);

        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 300);
      } else {
        setErrorMsg(data.msg || "Detection failed. Try again.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      setErrorMsg("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetDetection = () => {
    setImage(null);
    setImageUrl('');
    setCancerChance(0);
    setDetectionCompleted(false);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl md:max-w-5xl bg-white rounded-3xl shadow-xl p-8 sm:p-12">
        {!detectionCompleted ? (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-6 text-center">
              Hello {user?.name?.split(' ')[0] || 'Guest'}, check your skin health
            </h1>
            <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto text-sm sm:text-base">
              Upload a clear image of your skin area. Our AI will analyze and predict the chance of skin cancer. Your data is not stored.
            </p>

            <div className="flex flex-col sm:flex-row sm:space-x-10 items-center justify-center">
              {/* Drag & Drop Upload Area */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-xl p-10 w-full max-w-md cursor-pointer transition
                  ${dragActive ? 'border-blue-600 bg-blue-50' : 'border-gray-300 hover:border-blue-500'}
                `}
              >
                <FiUploadCloud className="text-6xl text-blue-600" />
                <p className="text-lg font-semibold text-gray-700">Drag & drop your skin image here</p>
                <span className="text-sm text-gray-500">or</span>
                <label
                  htmlFor="file-upload"
                  className="inline-block mt-1 px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  Browse from device
                  <input
                    id="file-upload"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Preview & Upload Button */}
              {image && (
                <div className="mt-8 sm:mt-0 flex flex-col items-center max-w-xs w-full">
                  <p className="text-sm text-gray-500 mb-3 truncate max-w-full text-center">
                    Selected file: <span className="font-semibold">{image.name}</span>
                  </p>
                  <img
                    src={URL.createObjectURL(image)}
                    alt="Skin Preview"
                    className="w-52 h-52 object-cover rounded-xl shadow-lg mb-6"
                  />
                  <button
                    onClick={handleUpload}
                    disabled={loading}
                    className={`w-full px-6 py-3 rounded-md text-white font-semibold transition ${
                      loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {loading ? 'Detecting...' : 'Detect Now'}
                  </button>
                </div>
              )}
            </div>

            {/* Error message */}
            {errorMsg && (
              <p className="mt-6 text-center text-sm text-red-600 font-medium">{errorMsg}</p>
            )}
          </>
        ) : (
          <div ref={resultRef} className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-6">Detection Complete</h2>
            <p className="text-gray-700 mb-6 text-lg">
              Based on the uploaded image, the AI predicts a <strong>{cancerChance}%</strong> chance of skin cancer.
            </p>
            <div className="flex justify-center mb-8">
              <img
                src={imageUrl}
                alt="Skin Result"
                className="w-52 h-52 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div>
              {cancerChance >= 70 ? (
                <p className="text-red-600 font-semibold mb-6 text-lg">
                  High risk detected. Please consult a dermatologist immediately.
                </p>
              ) : cancerChance >= 30 ? (
                <p className="text-yellow-600 font-medium mb-6 text-lg">
                  Moderate risk. Consider seeing a dermatologist.
                </p>
              ) : (
                <p className="text-green-600 font-medium mb-6 text-lg">
                  Low risk. No immediate concern, but monitor regularly.
                </p>
              )}
              <button
                onClick={resetDetection}
                className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold"
              >
                Test Another Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detect;
