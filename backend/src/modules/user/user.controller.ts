import { Request, Response } from "express";
import User from "./user.model"

const registerUser = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const user = new User(payload);
    const data = await user.save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      data,
    });
  } catch (error: any) {
    res.status(400).send({
      success: false,
      message: "User registration failed",
      error: error.message,
    });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await User.find();

    res.send({
      success: true,
      message: "Users Retrieved Successfully",
      data,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: "Failed to retrieve users",
      error: error.message,
    });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to retrieve user",
      error: error.message,
    });
  }
};


// ✅ Update User
const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const user = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: user,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to update user",
      error: error.message,
    });
  }
};

// ✅ Delete User
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: null,
      });
    }
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: "Failed to delete user",
      error: error.message,
    });
  }
};


export {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
