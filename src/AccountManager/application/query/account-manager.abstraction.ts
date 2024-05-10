import { TSigninRes } from "@/AccountManager/constant/account-manager.type";

export interface IAccountManagerQuery {
  signin(email: string, password: string): Promise<TSigninRes>;
}
