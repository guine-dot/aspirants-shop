import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

const PackageCard = ({ package: pkg, onSelect }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`p-4 rounded-lg border-2 cursor-pointer transition ${
        pkg.tier === 'premium'
          ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900 dark:border-yellow-500'
          : pkg.tier === 'vip'
          ? 'border-purple-400 bg-purple-50 dark:bg-purple-900 dark:border-purple-500'
          : 'border-gray-300 bg-white dark:bg-gray-800'
      }`}
      onClick={() => onSelect(pkg)}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-bold text-lg">{pkg.name}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">{pkg.quantity} Units</p>
        </div>
        {pkg.badge && (
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {pkg.badge}
          </span>
        )}
      </div>
      
      <div className="mb-3">
        <span className="text-2xl font-bold text-purple-600">₹{pkg.price}</span>
        {pkg.originalPrice && (
          <span className="ml-2 line-through text-gray-500">₹{pkg.originalPrice}</span>
        )}
      </div>

      {pkg.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{pkg.description}</p>
      )}

      <button className="w-full bg-purple-600 text-white py-2 rounded-lg font-bold hover:bg-purple-700 transition flex items-center justify-center space-x-2">
        <FiCheck />
        <span>Select Package</span>
      </button>
    </motion.div>
  );
};

export default PackageCard;
