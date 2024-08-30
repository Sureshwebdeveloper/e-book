import express from "express";
import {
  adminlogin,
  removeUser,
  userList,
  updateRole
} from "../Controllers/adminController.js";
const adminRouter = express.Router();

adminRouter.post("/login",adminlogin );
adminRouter.post("/remove", removeUser);
adminRouter.get("/users", userList);
adminRouter.post("/update-role", updateRole);

export default adminRouter;
