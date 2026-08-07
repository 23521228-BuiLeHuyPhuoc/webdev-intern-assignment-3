import { createReadStream } from "node:fs";
import { parse } from "csv-parse";
import {CSV_TO_DATABASE} from "../variables/variables";
import { prisma } from "../config/database";
import { Prisma } from "../generated/prisma/client";

async function Seed(): Promise<void> {
  const csvParser = createReadStream(
    "../dataset/diem_thi_thpt_2024.csv",
  ).pipe(
    parse({
      columns: true,
      skip_empty_lines: true,
      trim: true,
      bom: true,
    }),
  );

const BATCH_SIZE = 1000;
let inserted = 0;
const studentScores: Prisma.STUDENT_SCORECreateManyInput[] = [];

for await (const row of csvParser) {
  studentScores.push({
    [CSV_TO_DATABASE.sbd]: row.sbd,
    [CSV_TO_DATABASE.toan]: row.toan || null,
    [CSV_TO_DATABASE.ngu_van]: row.ngu_van || null,
    [CSV_TO_DATABASE.ngoai_ngu]: row.ngoai_ngu || null,
    [CSV_TO_DATABASE.vat_li]: row.vat_li || null,
    [CSV_TO_DATABASE.hoa_hoc]: row.hoa_hoc || null,
    [CSV_TO_DATABASE.sinh_hoc]: row.sinh_hoc || null,
    [CSV_TO_DATABASE.lich_su]: row.lich_su || null,
    [CSV_TO_DATABASE.dia_li]: row.dia_li || null,
    [CSV_TO_DATABASE.gdcd]: row.gdcd || null,
    [CSV_TO_DATABASE.ma_ngoai_ngu]:
      row.ma_ngoai_ngu || null,
  });

  if (studentScores.length >= BATCH_SIZE) {
    const result = await prisma.sTUDENT_SCORE.createMany({
      data: studentScores,
      skipDuplicates: true,
    });

    inserted += result.count;
    studentScores.length = 0;
    console.log(`Đã thêm ${result.count} học sinh trên tổng ${inserted} học sinh`);
  }

}

if (studentScores.length > 0) {
  const result = await prisma.sTUDENT_SCORE.createMany({
    data: studentScores,
    skipDuplicates: true,
  });

  inserted += result.count;
  console.log(`Đã thêm ${result.count} học sinh trên tổng ${inserted} học sinh`);
}

}
Seed()
  .catch((error) => {
    console.error("Seed thất bại:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

