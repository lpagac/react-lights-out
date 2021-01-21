import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.25 }) {
  const [board, setBoard] = useState(createBoard);

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    for (let row = 0; row < nrows; row++) {
      let tempRow = [];
      for (let col = 0; col < ncols; col++) {
        let rand = Math.random();
        tempRow.push(rand < chanceLightStartsOn);
      }
      initialBoard.push(tempRow);
    }
    return initialBoard;
  }

  function hasWon() {
    return board.every(row => row.every(val => val === false));
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const oldBoardCopy = oldBoard.map(row => [...row]);

      // Flip cell clicked and one above, below, right, and left
      flipCell(y, x, oldBoardCopy);
      flipCell(y + 1, x, oldBoardCopy);
      flipCell(y - 1, x, oldBoardCopy);
      flipCell(y, x + 1, oldBoardCopy);
      flipCell(y, x - 1, oldBoardCopy);

      return oldBoardCopy;
    });
  }

  function fillBoard() {
    let allRows = [];
    for (let row = 0; row < nrows; row++) {
      let tempRow = [];
      for (let col = 0; col < ncols; col++) {
        tempRow.push(<Cell isLit={board[row][col]}
          flipCellsAroundMe={flipCellsAround}
          id={`${row}-${col}`}
          key={`${row}-${col}`} />);
      }
      allRows.push(<tr key={row}>{tempRow}</tr>);
    }
    return allRows;
  }

  if (hasWon()) {
    return (
      <div>You win!</div>
    )
  }
  
  return (
    <table className="Board">
      <tbody className="Board-body">
        {fillBoard()}
      </tbody>
    </table>
  )

}

export default Board;
