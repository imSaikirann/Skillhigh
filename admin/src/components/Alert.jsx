import React from 'react';

const Alert = ({ message, isVisible, onClose }) => {
  return (
    isVisible && (
      <div
        id="toast-top-right"
        className="fixed flex items-center w-full max-w-xs p-4 space-x-4 bg-main text-white rounded-lg shadow top-5 right-5 "
        role="alert"
      >
        <div className="text-sm font-normal">{message}</div>
        <button
          onClick={onClose}
          className="ml-4 text-whit"
          aria-label="Close"
        >
          &times;
        </button>
      </div>
    )
  );
};

export default Alert;
