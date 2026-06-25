import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';

const Alert = ({ type = 'info', title, message, onClose }) => {
  const colors = {
    info: 'bg-blue-100 border-blue-500 text-blue-700',
    success: 'bg-green-100 border-green-500 text-green-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    error: 'bg-red-100 border-red-500 text-red-700'
  };

  return (
    <div className={`border-l-4 ${colors[type]} p-4 mb-4`}>
      <div className="flex items-start">
        <FiAlertCircle className="mr-3 mt-0.5" />
        <div>
          {title && <p className="font-bold">{title}</p>}
          <p>{message}</p>
        </div>
        {onClose && (
          <button onClick={onClose} className="ml-auto font-bold">×</button>
        )}
      </div>
    </div>
  );
};

export default Alert;
