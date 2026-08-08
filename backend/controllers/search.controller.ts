import type { Request, Response } from "express";
import { prisma } from "../config/database";

export async function getStudentParams(
  req: Request<{ id: string }>,
  res: Response,
) {
  const param = req.params.id;

  const record = await prisma.sTUDENT_SCORE.findUnique({
    where: {
      SoBaoDanh: param,
    },
  });

  return res.json({
    message: record ? "success" : "not found",
    data: record || null,
  });
}
