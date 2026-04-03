import cors from "cors";
import "dotenv/config";
import express from "express";
import "./db/connection";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();

const port = process.env.PORT || 8080;

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
console.log("FRONTEND_URL", FRONTEND_URL);
app.use(
  cors({
    origin: FRONTEND_URL,
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/projects", taskRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
