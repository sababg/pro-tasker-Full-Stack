import express from "express";

import taskController from "../controllers/taskController";
import { authMiddleware } from "../utils/auth";

const router = express.Router();

router.use(authMiddleware);
router.post("/:id/task", taskController.createTask);

router.get("/:id/users", taskController.getProjectUsers);

export default router;
