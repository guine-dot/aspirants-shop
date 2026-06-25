import React from 'react';
import { motion } from 'framer-motion';

const GameCard = ({ game, onClick }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="relative pb-full">
        <img
          src={game.icon || 'https://via.placeholder.com/300x300?text=' + game.name}
          alt={game.name}
          className="w-full h-48 object-cover"
        />
        {game.badge && (
          <div className="absolute top-2 right-2 bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold">
            {game.badge}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2">{game.name}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{game.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
            {game.packages?.length || 0} Packages
          </span>
          <span className="text-purple-600 font-bold">View →</span>
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
