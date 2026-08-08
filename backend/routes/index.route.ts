import { Router } from "express";
import searchRouter from "./search.route";
import dashboardRouter from "./dashboard.route";

const router = Router();

router.use("/search-scores", searchRouter);
router.use("/top-scores", dashboardRouter);

export default router;
