import express from "express";
import { bookHotel, userInfo } from "../controllers/userController.js";
import verify from "../middlewares/verify.js";

const userRouter = express.Router();

userRouter.post("/bookhotel", verify, bookHotel);
userRouter.get("/userInfo", verify, userInfo);

export default userRouter;
