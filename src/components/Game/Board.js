import React from "react";
import Square from "./Square";
const Board = ({ squares, onClick, flag1 }) => {
  //   console.log("squares", squares);
  return (
    <div className="board">
      {squares.map((square, i) => (
        <Square
          key={i}
          value={square}
          onClick={() => onClick(i)}
          flag={flag1}
        />
      ))}
    </div>
  );
};

export default Board;
