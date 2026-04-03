import express from "express";

import taskController from "../controllers/taskController";
import { authMiddleware } from "../utils/auth";

const router = express.Router();

router.use(authMiddleware);
router.post("/:id/task", taskController.createTask);
router.get("/:id/task", taskController.getTasks);
router.get("/:id/tasks/:taskId", taskController.getTaskById);
// router.put("/:id", taskController.updateTask);
router.delete("/:id/tasks/:taskId", taskController.deleteTask);

router.get("/:id/users", taskController.getProjectUsers);

export default router;
