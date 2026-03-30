import "dotenv/config";
import express from "express";
import "./db/connection";
import userRoutes from "./routes/userRoutes";

const app = express();

const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
