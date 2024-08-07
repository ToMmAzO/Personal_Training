import React from "react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-amber-200 border-4 border-amber-200 rounded-lg shadow-lg w-11/12 md:w-1/3 p-6">
        <h2 className="text-3xl font-bold mb-4 text-sky-950">{title}</h2>
        <div className="mb-4 text-lg text-sky-950">{children}</div>
        <button
          onClick={onClose}
          className="bg-red-500 text-white font-bold px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
