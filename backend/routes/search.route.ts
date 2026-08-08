import { Router } from "express";
import { getStudentParams } from "../controllers/search.controller.js";
import { validateRegistrationNumber } from "../validations/RegisNumber.validation.js";

const router = Router();

router.get("/:id", validateRegistrationNumber, getStudentParams);

export default router;
