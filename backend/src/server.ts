import cors from "cors";
import "dotenv/config";
import express from "express";
import "./db/connection";
import projectRoutes from "./routes/projectRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

const port = process.env.PORT || 8080;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", userRoutes);
app.use("/api/projects", projectRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
