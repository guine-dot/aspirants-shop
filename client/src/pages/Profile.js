import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { userAPI } from '../services/api';
import Alert from '../components/Alert';
import { toast } from 'react-toastify';
import { FiUser, FiMail, FiPhone, FiEdit2, FiLoader } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user, token } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await userAPI.updateProfile(formData, token);
      toast.success('Profile updated successfully!');
      setEditing(false);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">My Profile</h1>
            <button
              onClick={() => setEditing(!editing)}
              className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              <FiEdit2 />
              <span>{editing ? 'Cancel' : 'Edit'}</span>
            </button>
          </div>

          {editing ? (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block font-semibold mb-2">Username</label>
                <div className="flex items-center border rounded-lg px-3 py-2 dark:bg-gray-700">
                  <FiUser className="text-gray-400 mr-2" />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block font-semibold mb-2">Email</label>
                <div className="flex items-center border rounded-lg px-3 py-2 dark:bg-gray-700">
                  <FiMail className="text-gray-400 mr-2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled
                    className="w-full bg-transparent outline-none opacity-50"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block font-semibold mb-2">Phone</label>
                <div className="flex items-center border rounded-lg px-3 py-2 dark:bg-gray-700">
                  <FiPhone className="text-gray-400 mr-2" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    className="w-full bg-transparent outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition disabled:opacity-50"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Username</p>
                <p className="font-bold text-lg">{user?.username}</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-bold text-lg">{user?.email}</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Phone</p>
                <p className="font-bold text-lg">{user?.phone || 'Not added'}</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Member Since</p>
                <p className="font-bold text-lg">{new Date(user?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
