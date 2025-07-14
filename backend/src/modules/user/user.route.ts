import { Router } from "express";
import {
  registerUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "./user.controller";

const userRoutes = Router();

userRoutes.post("/user", registerUser);
userRoutes.get("/users", getUsers);
userRoutes.get("/user/:id", getUserById);
userRoutes.patch("/user/:id", updateUser);
userRoutes.delete("/user/:id", deleteUser);

export default userRoutes;