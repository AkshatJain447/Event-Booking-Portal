import express from "express";
import postContactMsg from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/", postContactMsg);

export default contactRouter;
