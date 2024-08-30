import mongoose from "mongoose";

const authModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Username Required"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is Required"],
    },
    password: {
      type: String,
      minLength: [4, "minimum 4 char length Required"],
      required: [true, "Password is Required"],
      select: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    cartData: {
      type: Object,
      default: {},
    },
    lastLogin: {
      type: Date,
      default: Date.now(),
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpiresAt: {
      type: Date,
    },
    verificationToken: {
      type: String,
    },
    verificationExpairesAt: {
      type: Date,
    },
  },
  { minimize: false },
  { Timestamp: true }
);

const userModel = mongoose.models.user || mongoose.model("user", authModel);
export default userModel;
