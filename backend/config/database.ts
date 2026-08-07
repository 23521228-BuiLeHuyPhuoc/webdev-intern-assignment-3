import "dotenv/config";

import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("Không tìm thấy DATABASE_URL trong file .env");
}

const adapter = new PrismaNeon({
  connectionString,
});

export const prisma = new PrismaClient({
  adapter,
});
export async function connectDatabase(): Promise<void> {
  try {
    await prisma.$connect;
    console.log("Kết nối cơ sở dữ liệu thành công!");
  } catch (error) {
    console.error("Lỗi sau xảy ra khi kết nối cơ sở dữ liệu:", error);
    throw error;
  }
}
