import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
    setIsOpen(false);
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      onClick={closeMenu}
      className={`px-3 py-2 rounded-md transition text-sm font-medium ${
        pathname === to ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'
      }`}
    >
      {children}
    </Link>
  );

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-700 tracking-wide">
          Derm<span className="text-blue-500">AI</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/">Home</NavLink>
          {user && <NavLink to="/detect">Detect</NavLink>}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1 rounded"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md z-40 px-6 pb-4 pt-2 space-y-2 transition-all">
          <NavLink to="/">Home</NavLink>
          {user && <NavLink to="/detect">Detect</NavLink>}
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full text-left py-2 text-blue-600 hover:underline text-sm"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
