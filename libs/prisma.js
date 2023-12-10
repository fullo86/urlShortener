import { PrismaClient as Client } from "@prisma/client";

export const prisma = global.prisma || new Client();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
