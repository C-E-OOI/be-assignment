import { Prisma, PrismaClient } from "@prisma/client";
import { EdtechRepository } from "../account-manager.repository";
import { SHA256 as hash } from "crypto-js";
import { DefaultArgs } from "@prisma/client/runtime/library";

export class EdtechMysqlRepository implements EdtechRepository {
  private _prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  private _hash;
  constructor(prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>) {
    this._prisma = prisma;
    this._hash = hash;
  }

  async insertUser(name: string, role: string, email: string, password: string): Promise<any> {
    const user = await this._prisma.user.create({
      data: { name: name, role: role, email: email, password: this._hash(password).toString() },
    });
    return user;
  }

  async findUser(email: string): Promise<any> {
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

  async findAll(): Promise<any> {
    const materis = await this._prisma.materi.findMany({
      where: {},
    });

    return materis;
  }

  async find(userId: string): Promise<any> {
    const whereCondition = userId ? { userId: userId } : {};
    const materis = await this._prisma.materi.findMany({
      where: whereCondition,
    });

    return materis;
  }

  async insert(userId: string, pathFile: string): Promise<any> {
    const materi = await this._prisma.materi.create({
      data: { userId: userId, material: pathFile },
    });

    return materi;
  }
}
