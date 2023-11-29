import React, { useEffect, useState, useRef } from "react";
import "./game.css";
import Square from "./square";
import { winningPatterns } from "../../utils/winnigPattern";
import { updateGameApi } from "../../api/game.api";

const Game = ({ roomCode, user, game, turn, setTurn, result, setResult }) => {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [gameStatus, setGameStatus] = useState();
  const isMounted = useRef(true);

  useEffect(() => {
    setTurn(game?.turn);
    setBoard(game?.board);
    setGameStatus(game.status);
    setResult({ winner: game?.winner, state: "none" });
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      return;
    }

    const winnerFound = checkWin();
    if (winnerFound) {
      updateGameData();
    }
    checkTie();
    updateGameData();
  }, [board, result.winner]);

  const updateGameData = async () => {
    try {
      await updateGameApi({
        roomCode: roomCode,
        turn: turn,
        board: board,
        winner: result.winner,
        status: gameStatus,
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const chooseSquare = (square) => {
    if (!gameStatus) {
      return;
    }
    if (user?.email === game?.playerX?.email) {
      if (turn === "X" && board[square] === "") {
        setTurn("O");
        setBoard((prevBoard) =>
          prevBoard.map((value, index) => (index === square ? "X" : value))
        );
      }
    }
    if (user?.email === game?.playerO?.email) {
      if (turn === "O" && board[square] === "") {
        setTurn("X");
        setBoard((prevBoard) =>
          prevBoard.map((value, index) => (index === square ? "O" : value))
        );
      }
    }
  };

  const checkWin = async () => {
    winningPatterns.forEach((currentPatterns) => {
      const firstPlayer = board[currentPatterns[0]];
      if (firstPlayer === "") return;

      let foundWinningPatterns = true;

      currentPatterns.forEach((index) => {
        if (board[index] !== firstPlayer) {
          foundWinningPatterns = false;
        }
      });

      if (foundWinningPatterns) {
        setResult({ winner: board[currentPatterns[0]], state: "You won" });
        setGameStatus(false);
        return true;
      }
    });
  };

  const checkTie = () => {
    let filled = true;
    board.forEach((square) => {
      if (square === "") {
        filled = false;
      }
    });
    if (filled) {
      setResult({ winner: "none", state: "Match Tie" });
      setGameStatus(false);
      return true;
    }
  };

  return (
    <div
      className={`board d-flex flex-column justify-content-center align-items-center`}
    >
      <div className="rows">
        <Square
          turn={turn}
          game={game}
          user={user}
          chooseSquare={() => chooseSquare(0)}
          value={board[0]}
        />
        <Square
          turn={turn}
          game={game}
          user={user}
          chooseSquare={() => chooseSquare(1)}
          value={board[1]}
        />
        <Square
          turn={turn}
          game={game}
          user={user}
          chooseSquare={() => chooseSquare(2)}
          value={board[2]}
        />
      </div>
      <div className="rows">
        <Square
          turn={turn}
          game={game}
          user={user}
          chooseSquare={() => chooseSquare(3)}
          value={board[3]}
        />
        <Square
          turn={turn}
          game={game}
          user={user}
          chooseSquare={() => chooseSquare(4)}
          value={board[4]}
        />
        <Square
          turn={turn}
          game={game}
          user={user}
          chooseSquare={() => chooseSquare(5)}
          value={board[5]}
        />
      </div>
      <div className="rows">
        <Square
          turn={turn}
          game={game}
          user={user}
          chooseSquare={() => chooseSquare(6)}
          value={board[6]}
        />
        <Square
          turn={turn}
          game={game}
          user={user}
          chooseSquare={() => chooseSquare(7)}
          value={board[7]}
        />
        <Square
          turn={turn}
          game={game}
          user={user}
          chooseSquare={() => chooseSquare(8)}
          value={board[8]}
        />
      </div>
    </div>
  );
};

export default Game;
