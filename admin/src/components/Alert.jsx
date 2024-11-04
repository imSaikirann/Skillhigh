import React from 'react';

const Alert = ({ message, isVisible, onClose }) => {
  return (
    isVisible && (
      <div
        id="toast-top-right"
        className="fixed flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow top-5 right-5 dark:text-gray-400 dark:divide-gray-700 dark:bg-gray-800"
        role="alert"
      >
        <div className="text-sm font-normal">{message}</div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    )
  );
};

export default Alert;
