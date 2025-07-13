import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotelByCity,
  getHotelById,
  updateHotel,
} from "../controllers/hotelController.js";
import verify from "../middlewares/verify.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const hotelRouter = express.Router();

hotelRouter.get("/", getAllHotels);
hotelRouter.get("/id/:id", getHotelById);
hotelRouter.get("/city/:city/:type", getHotelByCity);
hotelRouter.post("/", verify, verifyAdmin, createHotel);
hotelRouter.put("/update/:id", verify, verifyAdmin, updateHotel);
hotelRouter.delete("/delete/:id", verify, verifyAdmin, deleteHotel);

export default hotelRouter;
