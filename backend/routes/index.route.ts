import { Router } from "express";
import searchRouter from "./search.route.js";
import dashboardRouter from "./dashboard.route.js";
import reportsRouter from "./reports.route.js";
const router = Router();

router.use("/search-scores", searchRouter);

router.use("/top-scores", dashboardRouter);

router.use("/reports", reportsRouter);

export default router;
