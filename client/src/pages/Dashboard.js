import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FiLoader, FiTrendingUp, FiUsers, FiShoppingBag, FiDollarSign } from 'react-icons/fi';
import { adminAPI } from '../services/api';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const { user } = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    if (user?.username) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Mock data for demonstration
      setStats({
        totalSpent: 5490,
        totalOrders: 12,
        activeOrders: 2,
        points: 5490
      });
      setRecentOrders([
        { _id: '1', orderNumber: 'ORD-001', game: 'Mobile Legends', amount: 499, status: 'completed' },
        { _id: '2', orderNumber: 'ORD-002', game: 'Genshin Impact', amount: 999, status: 'processing' }
      ]);
    } catch (err) {
      toast.error('Failed to load dashboard');
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
        <h1 className="text-4xl font-bold mb-8">Welcome, {user?.username}! 👋</h1>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: FiDollarSign, label: 'Total Spent', value: '₹' + stats?.totalSpent, color: 'from-purple-600 to-purple-700' },
            { icon: FiShoppingBag, label: 'Total Orders', value: stats?.totalOrders, color: 'from-blue-600 to-blue-700' },
            { icon: FiTrendingUp, label: 'Active Orders', value: stats?.activeOrders, color: 'from-green-600 to-green-700' },
            { icon: FiUsers, label: 'Reward Points', value: stats?.points, color: 'from-yellow-600 to-yellow-700' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={`bg-gradient-to-br ${item.color} text-white p-6 rounded-lg shadow-lg`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">{item.label}</p>
                    <p className="text-3xl font-bold">{item.value}</p>
                  </div>
                  <Icon size={32} className="opacity-50" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {recentOrders.map(order => (
              <div key={order._id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-bold">{order.game}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{order.orderNumber}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-purple-600">₹{order.amount}</p>
                  <span className={`text-sm px-2 py-1 rounded ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
