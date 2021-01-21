import React from "react";
import "./Cell.css";

/** A single cell on the board.
 *
 * This has no state --- just three props:
 *
 * - flipCellsAroundMe: a function rec'd from the board which flips this
 *      cell and the cells around of it
 *
 * - isLit: boolean, is this cell lit?
 * 
 * - id: string like "1-2" => "<rowIndex>" + "-" + "<colIndex>"
 *
 * This handles clicks --- by calling flipCellsAroundMe
 *
 **/

function Cell({ flipCellsAroundMe, isLit=false, id }) {
  
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;
  
  function handleClick(evt) {
    flipCellsAroundMe(id);
  }
  return <td id={id} className={classes} onClick={handleClick} />;
}

export default Cell;
