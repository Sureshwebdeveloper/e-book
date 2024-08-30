import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import bookRouter from "./Routes/bookRoute.js";
import userRouter from "./Routes/authRoute.js";
import cartRouter from "./Routes/cartRoute.js";
import orderRouter from "./Routes/orderRoute.js";
import adminRouter from "./Routes/adminRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 11000;

// Allow us to parse incoming requests req.body
app.use(express.json());
// Allow us to parse incoming cookies
app.use(cookieParser());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hai Bro");
});

connectDB();

app.use("/api", bookRouter);
app.use("/api/images", express.static("uploads"));
app.use("/api/pdf", express.static("uploadedpdf"));
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Intenal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(PORT, () => {
  console.log(`Your App is Succesfully Running On http://localhost:${PORT}`);
});
