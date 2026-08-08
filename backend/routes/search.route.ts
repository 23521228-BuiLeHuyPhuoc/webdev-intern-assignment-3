import { Router } from "express";
import { getStudentParams } from "../controllers/search.controller";
import { validateRegistrationNumber } from "../validations/RegisNumber.validation";

const router = Router();

router.get("/:id", validateRegistrationNumber, getStudentParams);

export default router;
