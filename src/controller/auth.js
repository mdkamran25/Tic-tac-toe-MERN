import User from "../model/user/user.js";
import mongoose from "mongoose";
import { generateHashPassword, matchPassword } from "../utils/password.js";
import { generateToken, verifyToken } from "../utils/jwt.js";


export const authMiddleware =  async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    const verifiedToken = verifyToken(token);

    req.userId = verifiedToken.id;
    next();
}

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email && !password) {
      throw new Error("Email and Password is required");
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
        throw new Error("User Not Found");
    }
    
    const hashedPassword = await generateHashPassword(password);
    const hasMatched = await matchPassword(password, user.password);

    if (!hasMatched) {
      throw new Error("Incorrect Password");
    }

    const token = generateToken(user?._id);

    res.status(200).json({
      status: true,
      message: 'You have logged in successfully',
      data: token ,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message
    })
  }
};