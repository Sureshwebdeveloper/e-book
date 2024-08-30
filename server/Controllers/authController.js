import userModel from "../Models/authModel.js";
import bcrypt from "bcryptjs";
import Crypto from "crypto";
import jwt from "jsonwebtoken";
import sendVerificationEmail, {
  sendPasswordResetEmail,
  sendResetSuccessEmail,
  sendWelcomeEmail,
} from "../utils/otpMailer.js";
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const oneTimePassword = () => {
 const otp = Math.floor(
    10000 + Math.random() * 900000
  ).toString();

  if (otp.length >= 6) {
    return otp;
  }
}

const newUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please Fill All Fields" });
    }

    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      return res
        .status(400)
        .json({ success: false, message: "User Already Exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const verificationToken = oneTimePassword();

    const userData = new userModel({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationExpairesAt: Date.now() + 24 * 60 * 60 * 1000, // Expaires In 24Hours
    });

    const saveUserData = await userData.save();

    await sendVerificationEmail(userData.email, verificationToken);

    if (saveUserData) {
      return res.status(201).json({
        success: true,
        userData: {
          ...userData._doc,
          password: undefined,
          otp: verificationToken,
        },
        message:
          "Account Registerd Please Check Your Email For Verfication Otp",
      });
    }
  } catch (error) {
    // res.status(500).json({ success: false, message: "Internal Server Error" });
    next(error);
    console.log(error);
  }
};

const verifyEmail = async (req, res, next) => {
  const { otp } = req.body;
  try {
    const user = await userModel
      .findOne({
        verificationToken: otp,
        verificationExpairesAt: { $gt: Date.now() },
      })
      .select("+verificationToken +verificationExpiresAt");

    console.log("user", user);

    console.log("otp", otp);
    if (!user) {
     res.status(400).json({ success: false,
      message: "Invalid or Expaired Code",});
      next()
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpairesAt = undefined;
    await user.save();
    const token = createToken(user._id);
    await sendWelcomeEmail(user.email, user.name);

    res.status(200).json({
      success: true,
      message: "Email Verified Successfully",
      user: {
        ...user._doc,
        token: token,
        password: undefined,
      },
    });
  } catch (error) {
   next()
    console.log(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

  try {
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User Not Found" });
    }

    const checkPassword = bcrypt.compareSync(password, user.password);

    if (!checkPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Wrong Credentials" });
    }

    user.lastLogin = new Date();
    const token = createToken(user._id);
    return res.status(200).json({
      success: true,
      message: "Welcome Back",
      user: { ...user._doc, token: token, password: undefined },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
    console.log(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await userModel.findOne({ email });

  try {
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const resetToken = Crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000; // 1 Hour

    console.log("reset Token", resetToken);

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Reset Link Send To Your Email Shortly",
    });

    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    );
  } catch (error) {
    console.log("Error In Forgot Password", error);
    next();
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Invalid Or Expaired Token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();
    await sendResetSuccessEmail(user.email);
    res.status(200).json({
      success: true,
      message: "Password reset Successfull",
    });
  } catch (error) {
    next();
  }
};

export { newUser, verifyEmail, login, forgotPassword, resetPassword };
