import React from "react";

const DifficultySelect = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="difficulty" className="text-white">
        Select Difficulty:
      </label>
      <div className="relative inline-block ml-2">
        <select
          id="difficulty"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none bg-gray-700 border border-gray-500 text-white py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-gray-900 focus:border-gray-700"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-white">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M10 12l-4-4h8l-4 4z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default DifficultySelect;
