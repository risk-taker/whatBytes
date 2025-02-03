import { Router } from "express";
import { filterController } from "../Controller/filterController";

const router = Router();

router.get("/tasks?status=IN_PROGRESS&assignedUserId=5d47f53a-8f30-40f1-bf2c-45de54a402d8", filterController);