import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.listen(PORT, (err) => {
  if (err) {
    console.error("Error starting server:", err);
  }
  console.log(`Server is running on http://localhost:${PORT}`);
});
