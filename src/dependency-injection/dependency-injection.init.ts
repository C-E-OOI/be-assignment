import { PrismaClient } from "@prisma/client";

// Declare global object with prisma property
declare global {
  var prisma: PrismaClient | undefined;
}

export const prismaConnection = (): PrismaClient => {
  try {
    console.info("Init prisma connection");
    let prisma: PrismaClient;

    if (process.env.NODE_ENV != "production") {
      // Use global object if it exists, otherwise create and assign
      if (!global.prisma) {
        global.prisma = new PrismaClient();
      }
      prisma = global.prisma;
    } else {
      prisma = new PrismaClient();
    }

    return prisma;
  } catch (e) {
    console.error("Error Connecting to Prisma: ", e);
    throw e;
  }
};
