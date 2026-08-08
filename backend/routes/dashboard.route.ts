import { Router } from "express";
import { getTopStudents } from "../controllers/dashboard.controller";

const router = Router();

router.get("/", getTopStudents);

export default router;
