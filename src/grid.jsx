import React, { useState, useEffect } from "react";
import "./App.css"; // Include your CSS for styling the grid

function Grid() {
  // State for grid dimensions
  const [rows, setRows] = useState(15);
  const [cols, setCols] = useState(20);
  const [score, setScore] = useState(0);

  const createGrid = () => {
    return Array.from({ length: rows }, () => Array(cols).fill(0));
  };

  // Generate a grid (2D array)
  const [grid, setGrid] = useState(createGrid());

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const addRainDrop = () => {
    const ColIdx = Math.floor(Math.random() * cols);
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      newGrid[0][ColIdx] = getRandomColor(); // Set random color in the top row
      setScore((prevScore) => prevScore + 1); // Increment score
      return newGrid;
    });
  };

  // Function to move the raindrops down
  const moveRaindrops = () => {
    setGrid((prevGrid) => {
      // Check if prevGrid is defined and has rows
      if (!prevGrid || prevGrid.length === 0) {
        return createGrid(); // Return a new grid if there's an issue
      }

      const newGrid = createGrid(); // Create an empty grid

      // Move raindrops down
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          if (prevGrid[row] && prevGrid[row][col] !== 0 && row < rows - 1) {
            newGrid[row + 1][col] = prevGrid[row][col]; // Move raindrop down
          }
        }
      }
      return newGrid;
    });
  };

  const handleRowChange = (e) => {
    const newRows = Math.max(1, Math.min(30, Number(e.target.value))); // Ensure rows are within bounds
    setRows(newRows);
    setGrid(createGrid()); // Reset grid when rows change
  };

  const handleColChange = (e) => {
    const newCols = Math.max(1, Math.min(30, Number(e.target.value))); // Ensure cols are within bounds
    setCols(newCols);
    setGrid(createGrid()); // Reset grid when columns change
  };

  // Use useEffect to continuously add raindrops and move them down
  useEffect(() => {
    setGrid(createGrid()); // Reset the grid when rows or columns change
    const interval = setInterval(() => {
      addRainDrop();
      moveRaindrops();
    }, 500); // Adjust the speed of raindrops

    return () => clearInterval(interval);
  }, [rows, cols]); // Depend on rows and cols

  return (
    <>
      <div className="score">
        <h1>Score: {score}</h1>
      </div>
      <div>
        <label>
          Rows:
          <input
            type="number"
            value={rows}
            onChange={handleRowChange}
            min="0"
            max="30"
            style={{ width: "50px" }} // Optional: add a style for better visibility
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            value={cols}
            onChange={handleColChange}
            min="0"
            max="30"
            style={{ width: "50px" }} // Optional: add a style for better visibility
          />
        </label>
      </div>

      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className="cell"
                style={{
                  backgroundColor: cell !== 0 ? cell : "transparent", // Use the color stored in the cell
                  border: "1px solid lightgray", // Optional: add a border for better visibility
                  height: "20px", // Set a height for cells
                  width: "20px", // Set a width for cells
                }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Grid;
