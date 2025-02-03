import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import projectRoutes from "./projectRoutes.js";
import taskRoutes from "./taskRoutes.js";
import { filterController } from "../Controller/filterController.js";
// import ProjectRoutes from "./projectRoutes.js";
// import TaskRoutes from "./taskRoutes.js";

const router = Router();

router.use("/api", UserRoutes);
router.use("/api", projectRoutes);
router.use("/api", taskRoutes);
router.use("/api", filterController)
// router.use("/api/projects", ProjectRoutes);
// router.use("/api", TaskRoutes);

export default router;