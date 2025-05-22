import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage({ type: '', text: '' }); // Clear message on typing
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('http://localhost:5001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: 'error', text: data.msg || 'Login failed' });
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
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center text-blue-700">Welcome Back</h2>

        {message.text && (
          <div
            className={`text-sm px-4 py-2 rounded text-center ${
              message.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}
          >
            {message.text}
          </div>
        )}

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white transition ${
            loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{' '}
          <a href="/register" className="text-blue-600 hover:underline">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
