import express from "express";
import { registerController } from "../controllers/registerController.js";
import { loginController } from "../controllers/loginController.js";
import { logoutController } from "../controllers/logoutController.js";
import { employerDashboardController } from "../controllers/employerDashboardController.js";
import { createTasksController } from "../controllers/createTasksController.js";
import { getEmployeeTasksController } from "../controllers/getEmployeeTasksController.js";
import { deleteTasksController } from "../controllers/deleteTasksController.js";
import { employeeDashboardController } from "../controllers/employeeDashboardController.js";
import { patchTasksController } from "../controllers/patchTasksController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { isEmployerMiddleware } from "../middlewares/isEmployerMiddleware.js"
import { isEmployeeMiddleware } from "../middlewares/isEmployeeMiddleware.js"

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", authMiddleware, logoutController);
router.get("/employer/dashboard", authMiddleware, isEmployerMiddleware, employerDashboardController);
router.post("/tasks", authMiddleware, isEmployerMiddleware, createTasksController);
router.get("/tasks/:employeeId", authMiddleware, isEmployerMiddleware, getEmployeeTasksController);
router.delete("/tasks/:taskId", authMiddleware, isEmployerMiddleware, deleteTasksController);
router.get("/employee/dashboard", authMiddleware, isEmployeeMiddleware, employeeDashboardController);
router.patch("/tasks/:taskId", authMiddleware, isEmployeeMiddleware, patchTasksController);

export default router;
