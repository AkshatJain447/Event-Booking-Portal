import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import { connectDB } from "./config/db.js";
import hotelRouter from "./routes/hotelRoute.js";
import offerRouter from "./routes/offerRoute.js";
import contactRouter from "./routes/contactRoute.js";
import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://eventeaseportal.netlify.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", authRouter);
app.use("/api/users", userRouter);
app.use("/api/offers", offerRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/contactUs", contactRouter);

connectDB().then(() => {
  app.listen(PORT, (err) => {
    if (err) {
      console.error("Error starting server:", err);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
