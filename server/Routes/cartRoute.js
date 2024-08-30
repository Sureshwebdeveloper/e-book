import express from "express"
import authMiddleware from "../middleware/authMiddleware.js";
import { addToCart,removeFromCart,getCart } from "../Controllers/cartController.js";
const cartRouter = express.Router();

cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeFromCart);
cartRouter.post("/get",authMiddleware,getCart);

export default cartRouter;