import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { gameAPI } from '../services/api';
import { FiArrowRight, FiStar, FiTrendingUp, FiDownload } from 'react-icons/fi';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [games, setGames] = useState([]);

  useEffect(() => {
    loadPopularGames();
  }, []);

  const loadPopularGames = async () => {
    try {
      const response = await gameAPI.getAllGames();
      setGames(response.data.slice(0, 6));
    } catch (err) {
      console.error('Failed to load games:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ASPIRANTS.SHOP
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Your one-stop destination for premium game top-ups with the fastest delivery and best deals
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/games')}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-bold hover:opacity-90 transition flex items-center space-x-2"
              >
                <span>Explore Games</span>
                <FiArrowRight />
              </button>
              {!user && (
                <button
                  onClick={() => navigate('/register')}
                  className="border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-purple-600 hover:text-white transition"
                >
                  Sign Up
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white dark:bg-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FiDownload, title: 'Instant Delivery', desc: 'Get your top-up within minutes' },
              { icon: FiStar, title: '100% Secure', desc: 'Safe payment methods with buyer protection' },
              { icon: FiTrendingUp, title: 'Best Prices', desc: 'Competitive rates guaranteed' }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="bg-gray-50 dark:bg-gray-700 p-8 rounded-lg text-center"
                >
                  <Icon className="mx-auto text-4xl text-purple-600 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Popular Games */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12">Popular Games</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {games.map(game => (
              <motion.div
                key={game._id}
                whileHover={{ y: -5 }}
                onClick={() => navigate(`/games/${game._id}`)}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
              >
                <img
                  src={game.icon || 'https://via.placeholder.com/300x200'}
                  alt={game.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{game.name}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{game.description}</p>
                  <button className="w-full bg-purple-600 text-white py-2 rounded font-bold hover:bg-purple-700 transition">
                    View Packages
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white dark:bg-gray-800 py-20">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'How fast is the delivery?', a: 'Most orders are delivered within 5-10 minutes of payment confirmation.' },
              { q: 'What payment methods do you accept?', a: 'We accept UPI, Credit/Debit cards, and Net Banking.' },
              { q: 'Is it safe to buy here?', a: 'Yes! We have 100% buyer protection and secure payment processing.' },
              { q: 'Can I get a refund?', a: 'Refunds are available within 24 hours if the order fails.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
