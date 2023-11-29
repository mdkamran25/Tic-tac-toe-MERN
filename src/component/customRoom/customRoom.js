import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Game from "../game/game";
import { getUserProfile } from "../../api/user.api";
import { fetchRoomApi } from "../../api/game.api";
// import { Fireworks } from 'fireworks/lib/react'
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

const CustomRoom = () => {
  const [user, setUser] = useState();
  const [game, setGame] = useState();
  const [turn, setTurn] = useState();
  const [result, setResult] = useState({ winner: "", state: "none" });
  const { roomCode } = useParams();


  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        userData.status && setUser(userData.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const fetchGameData = async () => {
      const res = await fetchRoomApi(roomCode);
      if (!res.status) {
        console.log(res.message);
        return;
      }
      setGame(res.data);
    };
    fetchGameData();
  }, [roomCode]); 

  return (
    <div>
      <div className="container">
        <div className="row pt-2">
          <div className="col-12 text-center">
            <p className="">
              {user && game && user?.email === game?.playerO?.email
                ? "You have joined the game successfully: "
                : "Share it with your friend to join the room: "}
              <span className="fw-semibold">{roomCode}</span>
            </p>
          </div>
        </div>
        <div className="row d-flex flex-column-reverse flex-sm-row pt-3 mb-3 mb-sm-0  g-0">
          <div className="col-12 col-sm-5 col-md-6 d-flex justify-content-center align-items-center flex-column">
            {game && (
              <Game
                roomCode={roomCode}
                user={user}
                game={game}
                turn={turn}
                setTurn={setTurn}
                result={result}
                setResult={setResult}
              />
            )}
            <button
              className="btn btn-warning mt-3"
              onClick={() => window.location.reload(false)}
            >
              Refresh
            </button>
          </div>
          <div className="col-12 mb-4 ps-2 ps-sm-5 col-sm-7 col-md-6">
            <div className="col-12 col-xl-6">
              Your Sybmol:{" "}
              {user && game && game?.playerX?.email && user?.email === game?.playerX?.email
                ? "X"
                : "O"}
            </div>
            <div className="col-12 col-xl-6">
              Turn:{" "}
              {game && user && result.winner
                ? (result.winner === 'none'? "Match Tie" : `Game is completed & winner is ${
                    game.winner || result.winner
                  }`)
                : (turn === "X" && user?.email === game?.playerX?.email) ||
                  (turn === "O" && user?.email === game?.playerO?.email)
                ? "Your Turn"
                : "Opponent Turn"}
            </div>
            <div className="col-12 col-xl-6">
              Opponent:{" "}
              {game && user
                ? user?.email === game?.playerX?.email
                  ? game?.playerO?.name || "Waiting for opponent..."
                  : game?.playerX?.name
                : " "}
            </div>
          </div>
        </div>
      </div>
      {/* {
        result.winner &&
        ((result.winner === "X" && user?.email === game?.playerX?.email) ||
          (result.winner === "O" && user?.email === game?.playerO?.email))
          ? toast.success(`You wins the game! 🏆`)
          : toast.error(`You loose the game!`)
      } */}
      {/* <ToastContainer /> */}
    </div>
  );
};

export default CustomRoom;
