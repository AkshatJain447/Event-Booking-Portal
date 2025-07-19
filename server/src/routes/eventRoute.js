import express from "express";
import verify from "../middlewares/verify.js";
import { createEvent, getEventInfo } from "../controllers/eventController.js";

const eventRouter = express.Router();

eventRouter.get("/user", verify, getEventInfo);
eventRouter.post("/create", verify, createEvent);

export default eventRouter;
