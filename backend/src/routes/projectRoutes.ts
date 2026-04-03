import express from "express";

import projectController from "../controllers/projectController";
import { authMiddleware } from "../utils/auth";

const router = express.Router();

router.use(authMiddleware);
router.post("/", projectController.createProject);
router.get("/", projectController.getProjects);
router.get("/:id", projectController.getProjectById);
router.put("/:id", projectController.updateProject);
// router.delete("/:id", projectController.deleteProject);
router.post("/:id/collaborators", projectController.addCollaborator);
router.delete("/:id/collaborators", projectController.removeCollaborator);

export default router;
