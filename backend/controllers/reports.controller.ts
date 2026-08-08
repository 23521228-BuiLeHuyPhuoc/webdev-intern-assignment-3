import type { Request, Response } from "express";
import { Prisma } from "../generated/prisma/client.js";
import { prisma } from "../config/database";

const scoreFields = Object.values(Prisma.STUDENT_SCOREScalarFieldEnum).filter(
  (field) => field !== "SoBaoDanh" && field !== "MaNgoaiNgu",
);

function countScores(
  field: Prisma.STUDENT_SCOREScalarFieldEnum,
  range: { gte?: number; lt?: number },
) {
  const where = { [field]: range } as Prisma.STUDENT_SCOREWhereInput;

  return prisma.sTUDENT_SCORE.count({ where });
}

export async function getReportData(_req: Request, res: Response) {
  try {
    const statistics = await Promise.all(
      scoreFields.map(async (field) => {
        const [atLeast8, from6To8, from4To6, below4] = await Promise.all([
          countScores(field, { gte: 8 }),
          countScores(field, { gte: 6, lt: 8 }),
          countScores(field, { gte: 4, lt: 6 }),
          countScores(field, { lt: 4 }),
        ]);

        return {
          subject: field,
          atLeast8,
          from6To8,
          from4To6,
          below4,
        };
      }),
    );

    return res.status(200).json({
      message: "success",
      data: {
        name: "Score Distribution",
        categories: statistics.map((item) => item.subject),
        series: [
          {
            name: ">= 8",
            data: statistics.map((item) => item.atLeast8),
          },
          {
            name: "6 - 7.99",
            data: statistics.map((item) => item.from6To8),
          },
          {
            name: "4 - 5.99",
            data: statistics.map((item) => item.from4To6),
          },
          {
            name: "< 4",
            data: statistics.map((item) => item.below4),
          },
        ],
      },
    });
  } catch (error) {
    console.error("Failed to fetch report data:", error);

    return res.status(500).json({
      message: "Failed to fetch report data",
      data: null,
    });
  }
}
