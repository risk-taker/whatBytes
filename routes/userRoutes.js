import { Router } from "express";
import { deleteUser, listAllUsers, updateUser } from "../Controller/userController.js";
import { register } from "../Controller/auth/registerController.js";
import auth from "../middlewares/auth.js";
const router = Router();

router.post("/register", register);
router.get("/users", auth, listAllUsers);
router.put("/users/:id", auth, updateUser);
router.delete("/users/:id", auth, deleteUser);


export default router;