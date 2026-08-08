import { Router } from "express";
import { getTopStudents } from "../controllers/dashboard.controller.js";

const router = Router();

router.get("/", getTopStudents);

export default router;
