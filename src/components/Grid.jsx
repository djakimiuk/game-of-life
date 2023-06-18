import GridSquare from "./GridSquare";
import { useEffect, useState } from "react";
import board from "../ExamInput";

function Grid() {
  const [gridToDisplay, setGrid] = useState(board);
  const clickSquareValueHandler = (row, col) => {
    const gridCopy = [...gridToDisplay];
    gridCopy[row][col] === "0"
      ? (gridCopy[row][col] = "1")
      : (gridCopy[row][col] = "0");
    setGrid(gridCopy);
  };
  const renderGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
      grid.push([]);
      for (let col = 0; col < 20; col++) {
        grid[row].push(
          <GridSquare
            key={`${col}${row}`}
            color={`${gridToDisplay[row][col]}`}
            onClick={() => clickSquareValueHandler(row, col)}
          />
        );
      }
    }
    return grid;
  };

  const countSquareNeighbours = (squarePosition) => {
    const vectors = [-1, 0, 1];
    let squareRow = squarePosition[0];
    let squareCol = squarePosition[1];
    let neighboursCount = gridToDisplay[squareRow][squareCol] === "1" ? -1 : 0;
    for (let i = 0; i < vectors.length; i++) {
      for (let j = 0; j < vectors.length; j++) {
        if (
          gridToDisplay[squareRow + vectors[i]][squareCol + vectors[j]] === "1"
        ) {
          neighboursCount += 1;
        }
      }
    }
    return neighboursCount;
  };
  console.log(countSquareNeighbours([1, 1]));
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
