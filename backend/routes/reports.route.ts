import { Router } from "express";
import { getReportData } from "../controllers/reports.controller";

const router = Router();

router.get("/", getReportData);

export default router;
