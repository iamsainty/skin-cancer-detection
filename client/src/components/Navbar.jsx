import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  console.log(user);
  

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-blue-700">
          Derm<span className="text-blue-500">AI</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-6 items-center text-gray-700 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          {user && (
            <Link to="/detect" className="hover:text-blue-600 transition">Detect</Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-4 py-1.5 rounded-lg hover:bg-blue-700 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600 transition">Login</Link>
              <Link to="/register" className="hover:text-blue-600 transition">Register</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white px-6 pb-4 shadow-md">
          <Link to="/" onClick={closeMenu} className="block py-2 text-gray-700 hover:text-blue-600">
            Home
          </Link>
          {user && (
            <Link to="/detect" onClick={closeMenu} className="block py-2 text-gray-700 hover:text-blue-600">
              Detect
            </Link>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left py-2 text-blue-600 hover:underline"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={closeMenu} className="block py-2 text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" onClick={closeMenu} className="block py-2 text-gray-700 hover:text-blue-600">
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
