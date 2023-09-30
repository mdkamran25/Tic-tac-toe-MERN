import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema(
  {
    roomCode: {
      type: String,
      required: true,
    },
    playerX: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: 'User', // Name of the User model
      required: true,
    },
    playerO: {
      type: mongoose.Schema.Types.ObjectId, // Reference to User model
      ref: 'User', // Name of the User model
    },
    board: {
      type: [String],
      default: ['', '', '', '', '', '', '', '', ''],
    },
    turn: {
      type: String,
      default: 'X',
    },
    winner: {
      type: String,
      default: null,
    },
    status: {
      type: Boolean,
      default: false,
    },
    leftGame: {
      playerX: {
        type: Boolean,
        default: false,
      },
      playerO: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
  }
);

const game = mongoose.model('game', gameSchema);

export default game;
