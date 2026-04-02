import express from "express";

import userController from "../controllers/userController";
import { authMiddleware } from "../utils/auth";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);

router.use(authMiddleware);

export default router;
