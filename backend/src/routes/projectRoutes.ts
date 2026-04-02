import express from "express";

import projectController from "../controllers/projectController";
import { authMiddleware } from "../utils/auth";

const router = express.Router();

router.use(authMiddleware);
router.post("/", projectController.createProject);
router.get("/", projectController.getProjects);
// router.get("/:id", projectController.getProject);
// router.put("/:id", projectController.updateProject);
// router.delete("/:id", projectController.deleteProject);

export default router;
