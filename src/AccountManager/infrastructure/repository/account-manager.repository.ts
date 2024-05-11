import { TInsert } from "@/AccountManager/constant/account-manager.type";

export interface IAccountManagerRepository {
  insert(DTO: TInsert): Promise<string>;
  find(email: string): Promise<string>;
}
