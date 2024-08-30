import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
   await mongoose.connect(process.env.MONGO_URI);
    console.log("Successfully Connect DB");
  } catch (error) {
    console.log("Error To Connect DB");
    console.log(error.message);
  }
};

export default connectDB;
