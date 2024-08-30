import userModel from "../Models/authModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const adminlogin = async (req, res, next) => {
  const { email, password } = req.body;
  const admin = await userModel.findOne({ email }).select("+password");
  const isAdmin = admin && admin.isAdmin === true;

  try {
    if (!isAdmin) {
      return res
        .status(400)
        .json({ success: false, message: "your unauthorized, not a admin" });
    }

    const checkPassword = bcrypt.compareSync(password, admin.password);

    if (!checkPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Wrong Credentials" });
    }

    if (isAdmin) {
      const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      return res.status(200).json({
        success: true,
        id: admin._id,
        token: token,
        message: "Welcome admin",
      });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Display A Data For Admin Pannel
const userList = async (req, res, next) => {
  try {
    const user = await userModel.find({}, "-password");
    res.status(200).json({
      success: true,
      message: "User List Fetch Successfully",
      user,
    });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

const removeUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.body._id);
    res.status(200).json({
      success: true,
      message: "User Deleted",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "error",
    });
  }
};

// Role Update
const updateRole = async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.body._id, {
      isAdmin: req.body.isAdmin,
    });

    if (!user) {
      res.status(400).json({ success: false, message: "Id not matched" });
    }

    res.status(200).json({ success: true, message: "Role Updated", user });
  } catch (error) {
    next();
  }
};

export { adminlogin, removeUser, userList, updateRole };
