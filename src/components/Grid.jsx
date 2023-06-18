import GridSquare from "./GridSquare";
import { useEffect, useState } from "react";
import board from "../ExamInput";

function Grid() {
  const [grid, setGrid] = useState(board);

  const clickSquareValueHandler = (row, col) => {
    const gridCopy = [...grid];
    gridCopy[row][col] = gridCopy[row][col] === "0" ? "1" : "0";
    console.log(gridCopy);
    setGrid(gridCopy);
  };

  const renderGrid = () => {
    const gridToDisplay = [];
    for (let row = 0; row < grid.length; row++) {
      gridToDisplay.push([]);
      for (let col = 0; col < grid[0].length; col++) {
        gridToDisplay[row].push(
          <GridSquare
            key={`${col}${row}`}
            color={`${grid[row][col]}`}
            onClick={() => clickSquareValueHandler(row, col)}
          />
        );
      }
    }
    return gridToDisplay;
  };

  const countSquareNeighbours = (squareRow, squareCol, inputGrid) => {
    console.log(
      `Coordinates from countSquareNeighbours: ${squareRow}, ${squareCol}`
    );
    const vectors = [-1, 0, 1];
    let neighboursCount = 0;
    for (let i = 0; i < vectors.length; i++) {
      for (let j = 0; j < vectors.length; j++) {
        if (i === 1 && j === 1) {
          continue;
        }
        let row = squareRow + vectors[i];
        let col = squareCol + vectors[j];
        if (
          row >= 0 &&
          col >= 0 &&
          row < inputGrid.length &&
          col < inputGrid[0].length &&
          inputGrid[row][col] === "1"
        ) {
          neighboursCount++;
          console.log(
            `LOG from neighboursCount: neighboursCount${neighboursCount}, position: [${row}, ${col}]`
          );
        }
      }
    }
    return neighboursCount;
  };

  console.log(
    `result of count square neighbours`,
    countSquareNeighbours(2, 1, grid)
  );

  const canSquareBeAlive = (squareRow, squareCol, inputGrid) => {
    console.log(
      `Coordinates from canSquareBeAlive: ${squareRow}, ${squareCol}`
    );
    const squareValue = inputGrid[squareRow][squareCol];
    const neighboursAmount = countSquareNeighbours(
      squareRow,
      squareCol,
      inputGrid
    );

    if (squareValue === "1") {
      return neighboursAmount === 2 || neighboursAmount === 3;
    } else {
      return neighboursAmount === 3;
    }
  };

  console.log(`result of cansquarebealive ${canSquareBeAlive(2, 1, grid)}`);

  const updateGrid = () => {
    const gridCopy = [...grid];
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0].length; col++) {
        console.log(`Coordinates from updateGrid: ${row}, ${col}`);
        if (canSquareBeAlive(row, col, gridCopy)) {
          gridCopy[row][col] = "1";
        } else {
          gridCopy[row][col] = "0";
        }
      }
    }
    setGrid(gridCopy);
  };

  useEffect(() => {
    console.log(grid);
  }, [grid]);
  return (
    <>
      <div className="grid-board">{renderGrid()}</div>
      <div>
        <button onClick={() => updateGrid()}>START</button>
      </div>
    </>
  );
}

export default Grid;
