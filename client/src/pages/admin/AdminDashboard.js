import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { adminAPI, gameAPI, orderAPI } from '../../services/api';
import { FiLoader, FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp } from 'react-icons/fi';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
  const { token } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [gameStats, setGameStats] = useState([]);

  useEffect(() => {
    loadAdminData();
  }, [token]);

  const loadAdminData = async () => {
    try {
      setLoading(true);
      // Mock data for demo
      setAnalytics({
        totalUsers: 1250,
        totalOrders: 3840,
        totalRevenue: 450000,
        recentOrders: []
      });
      setRevenueData([
        { date: '2026-06-19', revenue: 15000, orders: 45 },
        { date: '2026-06-20', revenue: 18000, orders: 52 },
        { date: '2026-06-21', revenue: 22000, orders: 63 },
        { date: '2026-06-22', revenue: 19000, orders: 55 },
        { date: '2026-06-23', revenue: 25000, orders: 71 },
        { date: '2026-06-24', revenue: 23000, orders: 68 },
        { date: '2026-06-25', revenue: 28000, orders: 82 }
      ]);
    } catch (err) {
      toast.error('Failed to load admin data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <FiLoader className="animate-spin text-4xl text-purple-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: FiUsers, label: 'Total Users', value: analytics?.totalUsers, color: 'from-blue-600 to-blue-700' },
            { icon: FiShoppingBag, label: 'Total Orders', value: analytics?.totalOrders, color: 'from-green-600 to-green-700' },
            { icon: FiDollarSign, label: 'Total Revenue', value: '₹' + (analytics?.totalRevenue / 100000).toFixed(1) + 'L', color: 'from-purple-600 to-purple-700' },
            { icon: FiTrendingUp, label: 'Growth', value: '+12.5%', color: 'from-yellow-600 to-yellow-700' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={`bg-gradient-to-br ${item.color} text-white p-6 rounded-lg shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">{item.label}</p>
                    <p className="text-3xl font-bold mt-2">{item.value}</p>
                  </div>
                  <Icon size={32} className="opacity-50" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Revenue Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Revenue Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Orders Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Orders Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" stroke="#888" />
              <YAxis stroke="#888" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="orders"
                fill="#ec4899"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
