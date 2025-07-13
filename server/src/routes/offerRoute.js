import express from "express";
import { getAllOffers, createOffer } from "../controllers/offerController.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";
import verify from "../middlewares/verify.js";

const offerRouter = express.Router();

offerRouter.get("/", getAllOffers);
offerRouter.post("/", verify, verifyAdmin, createOffer);

export default offerRouter;
