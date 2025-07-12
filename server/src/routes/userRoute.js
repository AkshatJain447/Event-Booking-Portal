import express from "express";
import {
  bookHotel,
  findHotelById,
  userInfo,
} from "../controllers/userController.js";
import verify from "../middlewares/verify.js";

const userRouter = express.Router();

userRouter.post("/bookhotel", verify, bookHotel);
userRouter.get("/userInfo", verify, userInfo);
userRouter.get("/findhotel/:id", findHotelById);

export default userRouter;
