import React from "react";

const Button = ({ onClick, text, className }) => {
  return (
    <button
      onClick={onClick}
      className={`font-bold py-3 px-5 border-0 rounded-3xl text-base ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
