import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  const handleLogout = () => {
    if (logout) {
      logout();
    } else {
      localStorage.removeItem("token");
    }
    closeMenu();
    navigate("/");
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      onClick={closeMenu}
      className={`relative px-3 py-2 text-sm font-medium transition-all duration-300
        ${pathname === to ? "text-blue-700 font-semibold" : "text-gray-700 hover:text-blue-600"}
        group`}
      aria-current={pathname === to ? "page" : undefined}
    >
      {children}
      <span
        className={`absolute bottom-0 w-0 h-0.5 bg-blue-500 transition-all duration-300 group-hover:w-full group-hover:left-0 ${
          pathname === to ? "w-full left-0" : ""
        }`}
      ></span>
    </Link>
  );

  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-[100]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/" className="text-2xl font-bold text-blue-700 tracking-wide">
            Derm<span className="text-blue-500">AI</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="hidden md:flex items-center gap-6"
        >
          <NavLink to="/">Home</NavLink>
          {user && <NavLink to="/detect">Detect</NavLink>}
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Logout"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <Link
                to="/register"
                onClick={closeMenu}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Register
              </Link>
            </>
          )}
        </motion.div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 rounded"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ maxHeight: 0, opacity: 0 }}
            animate={{ maxHeight: 300, opacity: 1 }}
            exit={{ maxHeight: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white shadow-md px-6 pb-4 pt-2 space-y-2 overflow-hidden"
          >
            <NavLink to="/">Home</NavLink>
            {user && <NavLink to="/detect">Detect</NavLink>}
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 text-blue-600 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                aria-label="Logout"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink to="/login">Login</NavLink>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="block w-full text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Register
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
