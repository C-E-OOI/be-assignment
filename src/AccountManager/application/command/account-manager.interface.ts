import { TInsert, TInsertToken } from "@/AccountManager/constant/account-manager.type";

export interface IAccountManagerCommand {
  refreshToken(DTO: TInsertToken): Promise<void>;
  signup(DTO: TInsert): Promise<string>;
}
