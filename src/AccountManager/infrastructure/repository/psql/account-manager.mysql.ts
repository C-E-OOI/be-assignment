import { IAccountManagerRepository } from "../account-manager.repository";
import { TInsert, TRepositoryPrisma } from "@/AccountManager/constant/account-manager.type";
import bcrypt from "bcrypt";
import { SALT_ROUND } from "@/AccountManager/constant/account-manager.constant";

export class AccountManagerRepository implements IAccountManagerRepository {
  private _TAG;
  private _prisma: TRepositoryPrisma;
  private _bcrypt;
  constructor(prisma: TRepositoryPrisma) {
    this._TAG = "AccountManagerRepository";
    this._prisma = prisma;
    this._bcrypt = bcrypt;
  }

  async insert(DTO: TInsert): Promise<any> {
    try {
      const hashedPassword = await this._bcrypt.hash(DTO.password, SALT_ROUND);
      const user = await this._prisma.user.create({
        data: {
          name: DTO.name,
          role: DTO.role,
          email: DTO.email,
          password: hashedPassword,
        },
      });
      return user;
    } catch (error: any) {
      console.error(`${this._TAG} Got Error at func: insert(): ${error.message}`);
      throw new Error(`${this._TAG} Got Error at func: insert(): ${error.message}`);
    }
  }

  async find(email: string): Promise<any> {
    try {
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
    } catch (error: any) {
      console.error(`${this._TAG} Got Error at func: find(): ${error.message}`);
      throw new Error(`${this._TAG} Got Error at func: find(): ${error.message}`);
    }
  }
}
