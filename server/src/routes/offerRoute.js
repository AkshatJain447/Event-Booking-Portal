import express from "express";
import { getAllOffers, createOffer } from "../controllers/offerController.js";

const offerRouter = express.Router();

offerRouter.get("/", getAllOffers);
offerRouter.post("/", createOffer);

export default offerRouter;
