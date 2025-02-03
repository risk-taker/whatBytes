import { Router } from "express";
import { createProject, deleteProject, listAllProjects, updateProject } from "../Controller/projectController.js";
import auth from "../middlewares/auth.js";

const router = Router();


router.post("/projects", auth, createProject);
router.get("/projects", listAllProjects);
router.put("/projects/:id", updateProject);
router.delete("/projects/:id", deleteProject);

export default router;