import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { gameAPI } from '../services/api';
import GameCard from '../components/GameCard';
import { FiLoader, FiSearch } from 'react-icons/fi';

const Games = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      setLoading(true);
      const response = await gameAPI.getAllGames();
      setGames(response.data);
      dispatch({ type: 'FETCH_GAMES_SUCCESS', payload: response.data });
    } catch (err) {
      console.error('Failed to fetch games:', err);
      dispatch({ type: 'FETCH_GAMES_ERROR', payload: err.message });
    } finally {
      setLoading(false);
    }
  };

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">Popular Games</h1>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search games..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <FiLoader className="animate-spin text-4xl text-purple-600" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGames.map(game => (
              <GameCard
                key={game._id}
                game={game}
                onClick={() => navigate(`/games/${game._id}`)}
              />
            ))}
          </div>
        )}

        {!loading && filteredGames.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No games found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Games;
