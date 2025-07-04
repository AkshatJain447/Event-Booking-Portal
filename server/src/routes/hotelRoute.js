import express from "express";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  getHotelByCity,
  getHotelById,
  updateHotel,
} from "../controllers/hotelController.js";

const hotelRouter = express.Router();

hotelRouter.get("/", getAllHotels);
hotelRouter.get("/id/:id", getHotelById);
hotelRouter.get("/city/:city/:type", getHotelByCity);
hotelRouter.post("/", createHotel);
hotelRouter.put("/:id", updateHotel);
hotelRouter.delete("/:id", deleteHotel);

export default hotelRouter;
