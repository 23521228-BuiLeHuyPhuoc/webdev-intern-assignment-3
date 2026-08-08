import type { Request, Response } from "express";
import { prisma } from "../config/database";

export async function getTopStudents(_req: Request, res: Response) {
  try {
    const students = await prisma.$queryRaw`
      SELECT
        "SoBaoDanh",
        "DiemToan"::float8 AS "DiemToan",
        "VatLi"::float8 AS "VatLi",
        "HoaHoc"::float8 AS "HoaHoc",
        ("DiemToan" + "VatLi" + "HoaHoc")::float8 AS "TongDiem"
      FROM "STUDENT_SCORE"
      WHERE ("DiemToan" + "VatLi" + "HoaHoc") IS NOT NULL
      ORDER BY "TongDiem" DESC, "SoBaoDanh" ASC
      LIMIT 10
    `;

    return res.status(200).json({
      message: "success",
      data: students,
    });
  } catch (error) {
    console.error("Failed to fetch top students:", error);

    return res.status(500).json({
      message: "Failed to fetch top students",
      data: [],
    });
  }
}
