import game from "../model/game/game.js";

export const createGame = async (req, res) => {
  const roomData = {
    roomCode: req.body.roomCode,
    playerX: req.body.playerXId,
    board: req.body.board,
    currentPlayer: req.body.currentPlayer,
    winner: req.body.winner,
    status: req.body.status,
    leftGame: req.body.leftGame,
  };

  try {
    const room = await game.create(roomData);
    if (!room) {
      throw new Error("Something went wrong in room creation");
    }

    res.send({
      status: true,
      message: "Room Created Successfully",
    });
  } catch (err) {
    res.send({
      status: false,
      message: err.message,
    });
  }
};

export const joinGame = async (req, res) => {
  const { roomCode } = req.params;
  const { playerOId, status } = req.body;
  try {
    const checkRoom = await game.findOne({ roomCode: roomCode });

    if (checkRoom.playerO && checkRoom !== playerOId) {
      res.send({
        status: false,
        message: "Room is full",
      });
      return;
    }

    const room = await game.findOneAndUpdate(
      { roomCode: roomCode },
      req.body,
      { new: true } // To return the updated document
    );

    if (!room) {
      res.send({
        status: false,
        message: `No Room Found with this room Code: ${roomCode}`,
      });
    } else {
      res.send({
        status: true,
        message: `Player entered the room`,
      });
    }
  } catch (err) {
    console.error(err.message);
    // Handle the error appropriately
  }
};

export const fetchRoom = async (req, res) => {
  try {
    const { roomCode } = req.params;
    const room = await game
      .findOne({ roomCode })
      .populate("playerX") // Populate playerX with user data
      .populate("playerO"); // Populate playerO with user data

    if (!room) {
      throw new Error("room Not Found");
    }

    res.send({
      status: true,
      message: "Room fetched successfully",
      data: room,
    });
  } catch (err) {
    res.send({ status: false, message: err.message });
  }
};

export const updateGame = async (req, res) => {
  const { roomCode } = req.params;
  
  try {
    const room = await game.findOneAndUpdate({ roomCode: roomCode }, req.body, {
      new: true,
    });

    if (!room) {
      return res.status(404).json({
        status: false,
        message: `No Room Found with this room Code: ${roomCode}`,
      });
    }

    return res.status(200).json({
      status: true,
      message: "Game Updated",
      data: room, // Return the updated room data
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      status: false,
      message: "Internal Server Error",
    });
  }
};

export const fetchPreviousData = async (req, res) => {
  const { playerId } = req.params;
  const query = {
    $or: [{ playerX: playerId }, { playerO: playerId }],
  };

  try {
    const result = await game
      .find(query)
      .populate('playerX', 'name') // Replace 'name email' with the fields you want to populate for playerX
      .populate('playerO', 'name') // Replace 'name email' with the fields you want to populate for playerO
      .exec();

    res.json({
      status: true,
      message: "Fetched the user data",
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

