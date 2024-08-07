import React, { useState } from "react";

import INITIAL_DATA from "./models/sudoku";
import Modal from "./components/Modal";
import Button from "./components/Button";
import DifficultySelect from "./components/DifficultySelect";

function App() {
  const [difficulty, setDifficulty] = useState("easy"); // Default to easy difficulty
  const [sudokuArray, setSudokuArray] = useState(INITIAL_DATA[difficulty]); //sudokuGrids[pk].sudoku_grid
  const [incorrectCells, setIncorrectCells] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle difficulty change
  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    setSudokuArray(INITIAL_DATA[newDifficulty]);
  };

  //function to get deep copy of the array
  const getDeepCopy = (arr) => {
    return JSON.parse(JSON.stringify(arr));
  };

  //function to handle input change
  const onInputChange = (e, i, j) => {
    const value = parseInt(e.target.value) || -1;
    const grid = getDeepCopy(sudokuArray);

    if (value < 1 || value > 9) {
      grid[i][j] = -1;
    } else {
      grid[i][j] = value;
    }

    setSudokuArray(grid);
  };

  //function to compare two sudoku
  const compareSudoku = (sudoku1, sudoku2) => {
    let incorrect = [];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (sudoku1[i][j] !== sudoku2[i][j]) {
          incorrect.push([i, j]);
        }
      }
    }
    return incorrect;
  };

  //check if the sudoku is valid or not
  const checkSudoku = () => {
    const sudoku = getDeepCopy(INITIAL_DATA[difficulty]);
    solver(sudoku);
    const incorrect = compareSudoku(sudoku, sudokuArray);

    if (incorrect.length === 0) {
      setIsModalOpen(true);
    } else {
      setIncorrectCells(incorrect);
      setTimeout(() => setIncorrectCells([]), 1500); // Clear after 1,5 seconds
    }
  };

  //check if the number is valid or not
  const checkValid = (sudoku, row, col, num) => {
    //check if the number is present in the row
    for (let x = 0; x < 9; x++) {
      if (sudoku[row][x] === num) {
        return false;
      }
    }

    //check if the number is present in the column
    for (let x = 0; x < 9; x++) {
      if (sudoku[x][col] === num) {
        return false;
      }
    }

    //check if the number is present in the 3x3 grid
    const startRow = row - (row % 3);
    const startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (sudoku[i + startRow][j + startCol] === num) {
          return false;
        }
      }
    }

    return true;
  };

  //get the next cell
  const getNext = (row, col) => {
    //if the column is the last column, move to the next row
    if (col === 8) {
      //if the row is the last row, return [0, 0]
      if (row === 8) {
        return [0, 0];
      } else {
        return [row + 1, 0];
      }
    } else {
      return [row, col + 1];
    }
  };

  //recursive function to solve the sudoku
  let solver = (sudoku, row = 0, col = 0) => {
    //if the current cell is already filled, move to the next cell
    if (sudoku[row][col] !== -1) {
      const isLast = row >= 8 && col >= 8;
      if (!isLast) {
        let [nextRow, nextCol] = getNext(row, col);
        return solver(sudoku, nextRow, nextCol);
      }
    }

    for (let num = 1; num < 10; num++) {
      if (checkValid(sudoku, row, col, num)) {
        sudoku[row][col] = num;
        let [nextRow, nextCol] = getNext(row, col);

        if (!nextRow && !nextCol) {
          return true;
        }

        if (solver(sudoku, nextRow, nextCol)) {
          return true;
        }
      }
    }

    sudoku[row][col] = -1;
    return false;
  };

  //solve the sudoku
  const solveSudoku = () => {
    const sudoku = getDeepCopy(INITIAL_DATA[difficulty]);
    solver(sudoku);
    setSudokuArray(sudoku);
  };

  //reset the sudoku
  const resetSudoku = () => {
    const sudoku = getDeepCopy(INITIAL_DATA[difficulty]);
    setSudokuArray(sudoku);
  };

  return (
    <div className="text-center">
      <div className="bg-sky-950 min-h-screen flex flex-col items-center justify-center">
        <h3 className="text-3xl text-white mb-5">Sudoku Solver</h3>

        {/* Difficulty selection */}
        <DifficultySelect
          value={difficulty}
          onChange={(newDifficulty) => {
            handleDifficultyChange(newDifficulty);
          }}
        />

        {/* Sudoku table */}
        <table className="border-collapse border-4 border-amber-200 bg-amber-200">
          <tbody>
            {sudokuArray.map((row, i) => (
              <tr
                key={i}
                className={
                  (i + 1) % 3 === 0
                    ? "border-b-2 divide-solid border-black"
                    : ""
                }
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={
                      (j + 1) % 3 === 0
                        ? "p-0 border-r-2 divide-solid border-black"
                        : "p-0"
                    }
                  >
                    <input
                      type="text"
                      onChange={(e) => {
                        onInputChange(e, i, j);
                      }}
                      value={sudokuArray[i][j] === -1 ? "" : sudokuArray[i][j]}
                      disabled={INITIAL_DATA[difficulty][i][j] !== -1}
                      className={`w-12 h-12 text-base text-center p-0 border divide-solid border-black ${
                        incorrectCells.some(
                          (cell) => cell[0] === i && cell[1] === j
                        )
                          ? "bg-red-400"
                          : ""
                      }`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 space-x-4">
          <Button onClick={checkSudoku} text="Check" className="bg-red-500" />
          <Button
            onClick={solveSudoku}
            text="Solve"
            className="bg-orange-500"
          />
          {/* <Button onClick={submitSudoku} text="Submit" className="bg-orange-500" /> */}
          <Button onClick={resetSudoku} text="Reset" className="bg-teal-500" />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Sudoku Solver"
      >
        <p>Correct Solution!</p>
      </Modal>
    </div>
  );
}

export default App;
