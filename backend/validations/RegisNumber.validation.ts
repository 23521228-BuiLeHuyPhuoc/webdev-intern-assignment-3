import type { NextFunction, Request, Response } from "express";

export function validateRegistrationNumber(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const registrationNumber = req.params.id;

  if (
    typeof registrationNumber !== "string" ||
    !/^\d{8}$/.test(registrationNumber)
  ) {
    return res.status(400).json({
      message: "Invalid registration number",
    });
  }

  next();
}
