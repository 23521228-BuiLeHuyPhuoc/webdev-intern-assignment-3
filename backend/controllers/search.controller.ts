import type { Request, Response } from "express";
import { prisma } from "../config/database";

export async function getStudentParams(req: Request, res: Response) {
  const param = req.params.id;

  if (typeof param !== "string") {
    return res.status(400).json({ message: "Invalid registration number" });
  }

  const record = await prisma.sTUDENT_SCORE.findUnique({
    where: {
      SoBaoDanh: param,
    },
  });

  return res.json(record);
}
