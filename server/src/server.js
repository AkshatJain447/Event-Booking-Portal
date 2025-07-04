import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import hotelRouter from "./routes/hotelRoute.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use("/api/hotels", hotelRouter);

connectDB().then(() => {
  app.listen(PORT, (err) => {
    if (err) {
      console.error("Error starting server:", err);
    }
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
