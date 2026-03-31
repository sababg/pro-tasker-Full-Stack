import cors from "cors";
import "dotenv/config";
import express from "express";
import "./db/connection";
import userRoutes from "./routes/userRoutes";

const app = express();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
