import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUploadCloud } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Detect = () => {
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [detectionCompleted, setDetectionCompleted] = useState(false);
  const [cancerChance, setCancerChance] = useState(0);
  const [imageUrl, setImageUrl] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) navigate('/');
  }, [navigate, token]);

  const handleDrop = e => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
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
    }
  };

  const handleUpload = async () => {
    if (!image) return alert("Please select an image first.");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch("http://localhost:5001/api/detect/detectcancer", {
        method: "POST",
        headers: { token },
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        setImageUrl(data.imageUrl);
        setCancerChance(data.cancerChance);
        setDetectionCompleted(true);
      } else {
        alert(data.msg || "Detection failed.");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Something went wrong.");
    }
  };

  const resetDetection = () => {
    setImage(null);
    setImageUrl('');
    setCancerChance(0);
    setDetectionCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-lg p-8 sm:p-10">
        {!detectionCompleted ? (
          <>
            <h1 className="text-3xl sm:text-4xl font-bold text-blue-800 mb-4 text-center">
              Hello {user?.name || 'Guest'}, check your skin health
            </h1>
            <p className="text-center text-gray-600 mb-8 text-sm sm:text-base">
              Upload a clear image of your skin area. Our AI will analyze and predict the chance of skin cancer. Your data is not stored.
            </p>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-xl p-10 transition cursor-pointer
                ${dragActive ? 'border-blue-600 bg-blue-50' : 'border-gray-300'}
              `}
            >
              <FiUploadCloud className="text-5xl text-blue-600" />
              <p className="text-lg font-medium text-gray-700">Drag & drop your skin image here</p>
              <span className="text-sm text-gray-500">or</span>
              <label className="inline-block mt-1 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition">
                Browse from device
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handleChange}
                  className="hidden"
                />
              </label>
            </div>

            {image && (
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 mb-2">Selected file: {image.name}</p>
                <img
                  src={URL.createObjectURL(image)}
                  alt="Skin Preview"
                  className="mx-auto w-52 h-52 object-cover rounded-xl shadow-lg"
                />
                <button
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                  onClick={handleUpload}
                >
                  Detect Now
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-green-700 mb-4">Detection Complete</h2>
            <p className="text-center text-gray-700 mb-4">
              Based on the uploaded image, the AI predicts a <strong>{cancerChance}%</strong> chance of skin cancer.
            </p>
            <div className="flex justify-center mb-6">
              <img
                src={imageUrl}
                alt="Skin Result"
                className="w-52 h-52 object-cover rounded-xl shadow-lg"
              />
            </div>
            <div className="text-center">
              {cancerChance >= 70 ? (
                <p className="text-red-600 font-semibold mb-4">
                  High risk detected. Please consult a dermatologist immediately.
                </p>
              ) : cancerChance >= 30 ? (
                <p className="text-yellow-600 font-medium mb-4">
                  Moderate risk. Consider seeing a dermatologist.
                </p>
              ) : (
                <p className="text-green-600 font-medium mb-4">
                  Low risk. No immediate concern, but monitor regularly.
                </p>
              )}
              <button
                onClick={resetDetection}
                className="mt-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                Test Another Image
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Detect;