import { Router } from "express";
import searchRouter from "./search.route";
import dashboardRouter from "./dashboard.route";
import reportsRouter from "./reports.route";
const router = Router();

router.use("/search-scores", searchRouter);

router.use("/top-scores", dashboardRouter);

router.use("/reports", reportsRouter);

export default router;
