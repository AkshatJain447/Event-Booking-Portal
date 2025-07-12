import express from "express";
import { addHotel, displayHotel } from "../controllers/adminController.js";
import verify from "../middlewares/verify.js";
import verifyAdmin from "../middlewares/verifyAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/addhotel/:id", verify, verifyAdmin, addHotel);
adminRouter.get("/displayhotel", verify, verifyAdmin, displayHotel);

export default adminRouter;
