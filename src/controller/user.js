import User from "../model/user/user.js";
import { generateHashPassword } from "../utils/password.js";
import { generateToken } from "../utils/jwt.js";
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      throw new Error("Passwords don't match");
    }

    const hashedPassword = await generateHashPassword(password);

    const signUpData = {
      name: req.body.name,
      email: req.body.email,
      email: req.body.email,
      password: hashedPassword,
      phone: req.body.phone,
    };
    const user = await User.create(signUpData);

    if (!user) {
      throw new Error("Something went wrong with create user.");
    }
    const token = generateToken(user?._id);

    res.send({
      status: true,
      message: "User created successfully",
      data: token,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const id = req.userId || '';
    const user = await User.findById(id);
    if (!user) {
      throw new Error("User Not Found");
    }

    res.send({
      status: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id, req.body);
    if (!user) {
      res.send([
        {
          status: false,
          message: `User not found with this ${id}`,
        },
      ]);
    } else {
      res.send([
        {
          status: true,
          message: `User Deleted with ${id}`,
        },
      ]);
    }
  } catch (error) {
  }
};

export const updateUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      res.send([
        {
          status: false,
          message: `User not found with this ${id}`,
          data: null,
        },
      ]);
    } else {
      res.send([
        {
          status: true,
          message: "User Updated",
          data: user,
        },
      ]);
    }
  } catch (error) {
    console.log(error);
  }
};
