import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { gameAPI } from '../services/api';
import PackageCard from '../components/PackageCard';
import Alert from '../components/Alert';
import { FiArrowLeft, FiLoader } from 'react-icons/fi';

const GameDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useSelector(state => state.auth);
  const [game, setGame] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchGameDetails();
  }, [id]);

  const fetchGameDetails = async () => {
    try {
      setLoading(true);
      const response = await gameAPI.getGameById(id);
      setGame(response.data);
      setPackages(response.data.packages || []);
    } catch (err) {
      setError('Failed to load game details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = (pkg) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/checkout/${id}/${pkg._id}`);
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
        <button
          onClick={() => navigate('/games')}
          className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 mb-6"
        >
          <FiArrowLeft />
          <span>Back to Games</span>
        </button>

        {error && <Alert type="error" message={error} />}

        {game && (
          <div>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Game Info */}
              <div>
                <img
                  src={game.icon || 'https://via.placeholder.com/500x500?text=' + game.name}
                  alt={game.name}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              <div>
                <h1 className="text-4xl font-bold mb-4">{game.name}</h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">{game.description}</p>
                
                {game.tags && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {game.tags.map(tag => (
                      <span key={tag} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="bg-purple-50 dark:bg-purple-900 p-6 rounded-lg">
                  <h3 className="font-bold text-lg mb-2">Why Choose Us?</h3>
                  <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                    <li>✓ Instant Delivery</li>
                    <li>✓ 100% Secure Payment</li>
                    <li>✓ 24/7 Customer Support</li>
                    <li>✓ Best Prices Guaranteed</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Packages */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Available Packages</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {packages.length > 0 ? (
                  packages.map(pkg => (
                    <PackageCard
                      key={pkg._id}
                      package={pkg}
                      onSelect={() => handleCheckout(pkg)}
                    />
                  ))
                ) : (
                  <Alert type="info" message="No packages available for this game" />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GameDetail;
