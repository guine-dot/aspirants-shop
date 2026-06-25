import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiUser, FiLogOut, FiHome, FiGamepad2, FiShoppingBag } from 'react-icons/fi';
import { BsPalette } from 'react-icons/bs';
import { useState as useStateCallback } from 'react';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { user, token } = useSelector(state => state.auth);
  const { current: currentTheme, themes } = useSelector(state => state.theme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleThemeChange = (theme) => {
    dispatch({ type: 'THEME_CHANGE', payload: theme });
    setThemeOpen(false);
  };

  const handleLogout = () => {
    dispatch({ type: 'AUTH_LOGOUT' });
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 font-bold text-xl hover:opacity-80 transition">
            <FiGamepad2 size={24} />
            <span>ASPIRANTS.SHOP</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:opacity-80 transition">Home</Link>
            <Link to="/games" className="hover:opacity-80 transition">Games</Link>
            
            {user && (
              <>
                <Link to="/orders" className="hover:opacity-80 transition">Orders</Link>
                <Link to="/dashboard" className="hover:opacity-80 transition">Dashboard</Link>
              </>
            )}
          </div>

          {/* Right Items */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Switcher */}
            <div className="relative">
              <button
                onClick={() => setThemeOpen(!themeOpen)}
                className="flex items-center space-x-1 hover:opacity-80 transition"
              >
                <BsPalette size={20} />
                <span className="text-sm">Theme</span>
              </button>
              {themeOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-xl p-2 z-50">
                  {themes.map(theme => (
                    <button
                      key={theme}
                      onClick={() => handleThemeChange(theme)}
                      className={`block w-full text-left px-3 py-2 rounded hover:bg-gray-100 capitalize ${
                        currentTheme === theme ? 'bg-purple-100 font-bold' : ''
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {user ? (
              <>
                <Link to="/profile" className="flex items-center space-x-1 hover:opacity-80 transition">
                  <FiUser size={20} />
                  <span>{user.username}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 hover:opacity-80 transition"
                >
                  <FiLogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:opacity-80 transition">Login</Link>
                <Link to="/register" className="bg-white text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-opacity-90 transition">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
          >
            {mobileOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-purple-700 p-4 space-y-3">
            <Link to="/" className="block hover:opacity-80">Home</Link>
            <Link to="/games" className="block hover:opacity-80">Games</Link>
            {user && (
              <>
                <Link to="/orders" className="block hover:opacity-80">Orders</Link>
                <Link to="/dashboard" className="block hover:opacity-80">Dashboard</Link>
              </>
            )}
            <button
              onClick={() => setThemeOpen(!themeOpen)}
              className="block w-full text-left hover:opacity-80"
            >
              Change Theme
            </button>
            {user ? (
              <>
                <Link to="/profile" className="block hover:opacity-80">Profile</Link>
                <button onClick={handleLogout} className="block w-full text-left hover:opacity-80">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block hover:opacity-80">Login</Link>
                <Link to="/register" className="block hover:opacity-80">Register</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
