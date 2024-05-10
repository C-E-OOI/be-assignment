import { Prisma, PrismaClient } from "@prisma/client";
import { IAccountManagerRepository } from "../account-manager.repository";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { hash } from "bun";
import { TInsert } from "@/AccountManager/constant/account-manager.type";

export class AccountManagerRepository implements IAccountManagerRepository {
  private _prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  private _hash;
  constructor(prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
    this._prisma = prisma;
    this._hash = hash;
  }

  async insert(DTO: TInsert): Promise<any> {
    const user = await this._prisma.user.create({
      data: {
        name: DTO.name,
        role: DTO.role,
        email: DTO.email,
        password: this._hash(DTO.password).toString(),
      },
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
