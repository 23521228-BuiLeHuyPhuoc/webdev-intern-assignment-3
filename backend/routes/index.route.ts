import { Router } from "express";
import { getStudentParams } from "../controllers/search.controller";

const router = Router();

router.get("/search-scores/:id", getStudentParams);

export default router;
