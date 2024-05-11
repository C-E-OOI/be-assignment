import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { ElysiaCookie } from "elysia/dist/cookies";
import { StatusMap } from "elysia/dist/utils";

export type TInsert = { name: string; role: string; email: string; password: string };
export type TInsertToken = { hashedToken: string; id: string; userId: number };
export type TRepositoryPrisma = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

export type TSigninRes = { statusCode: number; token: string; message: { email: string; role: string } };
export type TSigninResDb = { id: number; email: string; role: string };
export type TSignupRes = { statusCode: number; message: string };

export type TReqSignin = { email: string; password: string };
export type TReqSignup = { name: string; role: string; email: string; password: string };

type SetCookie = {
  "Set-Cookie"?: string | string[];
};
export type TCustomSetElysia = {
  headers: Record<string, string> & SetCookie;
  status?: number | keyof StatusMap;
  redirect?: string;
  /**
   * ! Internal Property
   *
   * Use `Context.cookie` instead
   */
  cookie?: Record<string, ElysiaCookie>;
};
