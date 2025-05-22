import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUploadCloud } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

const Detect = () => {
  const [image, setImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user && !token) {
      navigate('/');
    }
  }, [user, navigate, token]);

  console.log(user);

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

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleChange = e => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">
            Hello {user?.name || 'Guest'}, let's check your skin health
          </h1>
          <p className="text-gray-600">
            Upload a clear image of your skin area. Our AI will analyze it and predict the possibility of skin cancer.
            Your data is safe and not stored anywhere.
          </p>
        </div>

        {/* Upload Box */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`flex flex-col items-center justify-center gap-3 p-10 border-2 border-dashed rounded-xl transition cursor-pointer
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

        {/* Image Preview */}
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
              onClick={() => alert('Detection logic coming soon!')}
            >
              Detect Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detect;
