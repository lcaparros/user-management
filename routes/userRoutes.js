import { Router } from "express";
import { getUsers } from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { verifyRoles } from "../middlewares/roleMiddleware.js";

const router = Router();

router.get(
  "/users",
  verifyToken,
  verifyRoles("admin", "user_manager"),
  getUsers
);

export default router;
