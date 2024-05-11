import jwt from "@elysiajs/jwt";
import { PrismaClient } from "@prisma/client";
import Elysia, { t } from "elysia";

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

export const basicAuthModel = new Elysia().model({
  basicAuthModel: t.Object({
    email: t.String(),
    password: t.String(),
  }),
});

export const jwtAccessSetup = new Elysia({
  name: "jwtAccess",
}).use(
  jwt({
    name: "jwtAccess",
    schema: t.Object({
      id: t.String(),
    }),
    secret: process.env.JWT_ACCESS_SECRET!,
    exp: "5m",
  })
);

export const jwtRefreshSetup = new Elysia({
  name: "jwtRefresh",
}).use(
  jwt({
    name: "jwtRefresh",
    schema: t.Object({
      id: t.String(),
    }),
    secret: process.env.JWT_REFRESH_SECRET!,
    exp: "1d",
  })
);
