import { Router } from "express";
import UserRoutes from "./userRoutes.js";
import projectRoutes from "./projectRoutes.js";
import taskRoutes from "./taskRoutes.js";
import { filterController } from "../Controller/filterController.js";


const router = Router();

router.use("/api", UserRoutes);
router.use("/api", projectRoutes);
router.use("/api", taskRoutes);
router.use("/api", filterController)

export default router;