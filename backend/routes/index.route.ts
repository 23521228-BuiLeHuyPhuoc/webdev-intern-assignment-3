import { Router } from "express";
import { type Request, type Response } from "express";
import { handleClick } from "../controllers/click.controller";
const router=Router();
router.post("/",handleClick);
export default router;