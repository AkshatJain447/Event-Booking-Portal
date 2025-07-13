import express from "express";
import {
  bookHotel,
  findHotelById,
  removeHotel,
  userInfo,
} from "../controllers/userController.js";
import verify from "../middlewares/verify.js";

const userRouter = express.Router();

userRouter.post("/bookhotel", verify, bookHotel);
userRouter.post("/removehotel/:id", verify, removeHotel);
userRouter.get("/userInfo", verify, userInfo);
userRouter.get("/findhotel/:id", findHotelById);

export default userRouter;
