import { TInsert } from "@/AccountManager/constant/account-manager.type";

export interface IAccountManagerCommand {
  signup(DTO: TInsert): Promise<string>;
}
