import express from "express";
import {
  createGame,
  joinGame,
  fetchRoom,
  updateGame,
  fetchPreviousData
} from "../controller/game.js";
import { authMiddleware } from "../controller/auth.js";

const gameRouter = express.Router();


gameRouter.post("/createRoom", createGame);


gameRouter.patch("/joinRoom/:roomCode", joinGame);


gameRouter.get("/fetchRoom/:roomCode", fetchRoom);


gameRouter.patch("/updateGame/:roomCode", updateGame);


gameRouter.get("/previousGameData/:playerId", fetchPreviousData);

export default gameRouter;
