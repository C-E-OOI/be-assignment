import { TInsert, TInsertToken } from "@/AccountManager/constant/account-manager.type";

export interface IAccountManagerRepository {
  insert(DTO: TInsert): Promise<string>;
  find(email: string): Promise<string>;
  insertToken(DTO: TInsertToken): Promise<void>;
}
