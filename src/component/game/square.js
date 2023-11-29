import React from "react";
import "./game.css";
const Square = ({turn, chooseSquare, value, game, user }) => {
  return (
    <div
      className={`square ${
        game?.playerO ? 
        (turn === "X" && user?.email === game?.playerX?.email) ||
        (turn === "O" && user?.email === game?.playerO?.email) 
          ? ""
          : "not-allowed-cursor"
        : "not-allowed-cursor"
      }`}
      onClick={chooseSquare}
    >
      {value}
    </div>
  );
};

export default Square;
