import { Prisma, PrismaClient } from "@prisma/client";
import { IAccountManagerRepository } from "../account-manager.repository";
import { SHA256 as hash } from "crypto-js";
import { DefaultArgs } from "@prisma/client/runtime/library";

export class AccountManagerRepository implements IAccountManagerRepository {
  private _prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  private _hash;
  constructor(prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
    this._prisma = prisma;
    this._hash = hash;
  }

  async insert(name: string, role: string, email: string, password: string): Promise<any> {
    const user = await this._prisma.user.create({
      data: { name: name, role: role, email: email, password: this._hash(password).toString() },
    });
    return user;
  }

  async find(email: string): Promise<any> {
    const user = await this._prisma.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        password: true,
      },
    });
    return user;
  }
}
