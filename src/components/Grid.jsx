import GridSquare from "./GridSquare";
import { useEffect, useState } from "react";
import board from "../ExamInput";

function Grid() {
  
  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < gridToDisplay.length; row++) {
      grid.push([]);
      for (let col = 0; col < gridToDisplay[0].length; col++) {
        grid[row].push(
          <GridSquare
            key={`${col}${row}`}
            color={`${gridToDisplay[row][col]}`}
          />
        );
      }
    }
    return grid;
  };

  return (
    <>
      <div className="grid-board">{renderGrid()}</div>
      <div>
        <button onClick={() => startGame()}>START</button>
      </div>
    </>
  );
}

export default Grid;
