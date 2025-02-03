import { Router } from "express";
import { createTask, deleteTask, updateTask } from "../Controller/taskController.js";
import { listAllProjects } from "../Controller/projectController.js";
import auth from "../middlewares/auth.js";
const router = Router();

router.post("/projects/:projectId/tasks", auth, createTask)
router.get("/project/:projectId/tasks", listAllProjects);
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;