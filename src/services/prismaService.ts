import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient();
process.on('exit', prismaClient.$disconnect);

