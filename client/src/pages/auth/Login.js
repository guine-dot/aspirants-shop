import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAPI } from '../../services/api';
import { toast } from 'react-toastify';
import Alert from '../../components/Alert';
import { FiMail, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.login(formData);
      
      dispatch({
        type: 'AUTH_LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: response.data.token
        }
      });
      
      toast.success('Login successful!');
      navigate('/');
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">Login to your ASPIRANTS.SHOP account</p>

        {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block font-semibold mb-2">Email</label>
            <div className="flex items-center border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600">
              <FiMail className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block font-semibold mb-2">Password</label>
            <div className="flex items-center border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600">
              <FiLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link to="/forgot-password" className="text-purple-600 text-sm hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-600 dark:text-gray-400">
            Don't have an account? <Link to="/register" className="text-purple-600 font-bold hover:underline">Register</Link>
          </p>
        </form>

        {/* Demo Credentials */}
        <div className="mt-6 pt-6 border-t dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Demo Credentials:</p>
          <p className="text-sm font-mono bg-gray-100 dark:bg-gray-700 p-2 rounded">
            Email: demo@example.com
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
