import express from "express";
import {
  login,
  newUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../Controllers/authController.js";

const userRouter = express.Router();


userRouter.post("/register", newUser);
userRouter.post("/login", login);
userRouter.post("/verify-email", verifyEmail);
userRouter.post("/forgot-password", forgotPassword);
userRouter.post("/reset-password/:token", resetPassword);

export default userRouter;
