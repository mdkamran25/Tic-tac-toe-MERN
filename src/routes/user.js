import express from "express";
import {
  getAllUser,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
} from "../controller/user.js";
import { authMiddleware } from "../controller/auth.js";

const router = express.Router();

//all routes in here are starting with /users so we just need / in .get method
router.get("/user", getAllUser);

router.post("/user", createUser);

router.get("/user/profile", authMiddleware ,getUserById);

router.delete("/user/:id", deleteUserById);

router.patch("/user/:id", updateUserById);


export default router;
