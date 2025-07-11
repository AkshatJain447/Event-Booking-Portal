import express from "express";
import { bookHotel } from "../controllers/userController.js";
import verify from "../middlewares/verify.js";

const userRouter = express.Router();

userRouter.post("/bookhotel", verify, bookHotel);

export default userRouter;
