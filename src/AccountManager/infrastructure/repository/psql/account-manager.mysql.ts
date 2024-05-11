import { TInsert, TInsertToken, TRepositoryPrisma } from "@/AccountManager/constant/account-manager.type";
import { IAccountManagerRepository } from "../account-manager.repository.interface";

export class AccountManagerRepository implements IAccountManagerRepository {
  private _TAG;
  private _prisma: TRepositoryPrisma;
  private _hasher;
  constructor(prisma: TRepositoryPrisma) {
    this._TAG = "AccountManagerRepository";
    this._prisma = prisma;
    this._hasher = Bun.password;
  }

  async insertToken(DTO: TInsertToken) {
    try {
      await this._prisma.refreshToken.create({
        data: {
          id: DTO.id,
          userId: DTO.userId,
          hashedToken: DTO.hashedToken,
        },
      });
    } catch (error: any) {
      console.error(`${this._TAG} Got Error at func: insertToken(): ${error.message}`);
      throw new Error(`${this._TAG} Got Error at func: insertToken(): ${error.message}`);
    }
  }

  async insert(DTO: TInsert): Promise<any> {
    try {
      const hashedPassword = await this._hasher.hash(DTO.password);
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
