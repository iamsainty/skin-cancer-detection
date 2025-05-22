import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', age: '', gender: '' });
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' }); // new message state

  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('http://localhost:5001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: 'error', text: data.msg || 'Registration failed' });
        return;
      }

      setMessage({ type: 'success', text: 'OTP sent to your email. Please verify.' });
      setShowOtp(true);
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Something went wrong. Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('http://localhost:5001/api/auth/verifyotp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: 'error', text: data.msg || 'OTP verification failed' });
        return;
      }

      const token = data.token;
      if (token) {
        localStorage.setItem("token", token);
        navigate('/detect');
        window.location.reload();
      } else {
        setMessage({ type: 'error', text: 'Something went wrong. Try again later.' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Something went wrong. Try again later.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <form
        onSubmit={showOtp ? handleVerifyOtp : handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-700">
          {showOtp ? 'Verify Your Email' : 'Create Your Account'}
        </h2>

        {message.text && (
          <div
            className={`text-sm px-4 py-2 rounded text-center ${
              message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {message.text}
          </div>
        )}

        {showOtp ? (
          <>
            <input
              name="email"
              type="email"
              value={form.email}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-700"
            />
            <input
              name="otp"
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg transition ${
                loading ? 'bg-green-400' : 'bg-green-600 hover:bg-green-700'
              } text-white`}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </>
        ) : (
          <>
            <input
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              name="age"
              type="number"
              placeholder="Age"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <select
              name="gender"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-lg transition ${
                loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
            <p className="text-sm text-center text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
