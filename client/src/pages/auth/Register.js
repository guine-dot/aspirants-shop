import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authAPI } from '../../services/api';
import { toast } from 'react-toastify';
import Alert from '../../components/Alert';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [step, setStep] = useState(1); // 1: form, 2: email verification
  const [verificationCode, setVerificationCode] = useState('');
  const [registeredEmail, setRegisteredEmail] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (!formData.email.includes('@')) {
      setError('Valid email is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      await authAPI.register({
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      setRegisteredEmail(formData.email);
      setStep(2);
      toast.success('Verification code sent to your email');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    
    if (!verificationCode.trim()) {
      setError('Please enter verification code');
      return;
    }

    try {
      setLoading(true);
      const response = await authAPI.verifyEmail({
        email: registeredEmail,
        code: verificationCode
      });
      
      dispatch({
        type: 'AUTH_LOGIN_SUCCESS',
        payload: {
          user: response.data.user,
          token: response.data.token
        }
      });
      
      toast.success('Email verified successfully!');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed');
      toast.error('Verification failed');
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
        <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">Join ASPIRANTS.SHOP today</p>

        {error && <Alert type="error" message={error} onClose={() => setError(null)} />}

        {step === 1 ? (
          <form onSubmit={handleRegister} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block font-semibold mb-2">Username</label>
              <div className="flex items-center border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600">
                <FiUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Enter username"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

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
                  placeholder="Enter email"
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
                  placeholder="Enter password"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-semibold mb-2">Confirm Password</label>
              <div className="flex items-center border rounded-lg px-3 py-2 dark:bg-gray-700 dark:border-gray-600">
                <FiLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="Confirm password"
                  className="w-full bg-transparent outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <p className="text-center text-gray-600 dark:text-gray-400">
              Already have an account? <Link to="/login" className="text-purple-600 font-bold hover:underline">Login</Link>
            </p>
          </form>
        ) : (
          <form onSubmit={handleVerifyEmail} className="space-y-4">
            <Alert
              type="info"
              message={`We've sent a verification code to ${registeredEmail}`}
            />

            <div>
              <label className="block font-semibold mb-2">Verification Code</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                maxLength="6"
                className="w-full px-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-center text-2xl tracking-widest font-bold"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify Email'}
            </button>

            <button
              type="button"
              onClick={() => setStep(1)}
              className="w-full text-purple-600 py-2 font-bold hover:underline"
            >
              Back to Registration
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default Register;
