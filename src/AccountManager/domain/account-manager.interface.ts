import { TInsert, TInsertToken } from "../constant/account-manager.type";

export interface IAccountManagerService {
  add(DTO: TInsert): Promise<Record<string, string>>;
  get(email: string): Promise<any>;
  addToken(DTO: TInsertToken): Promise<void>;
}
