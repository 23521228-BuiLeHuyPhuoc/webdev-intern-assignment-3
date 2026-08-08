import { Router } from "express";
import { getReportData } from "../controllers/reports.controller.js";

const router = Router();

router.get("/", getReportData);

export default router;
