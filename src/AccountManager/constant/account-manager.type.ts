import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import Elysia from "elysia";

export type TInsert = { name: string; role: string; email: string; password: string };
export type TRepositoryPrisma = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
export type TSigninRes = { data: { token: string; email: string } };

export type TReqSignin = { email: string; password: string };
export type TReqSignup = { name: string; role: string; email: string; password: string };
