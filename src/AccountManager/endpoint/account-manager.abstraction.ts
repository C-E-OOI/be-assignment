import { TSigninRes } from "../constant/account-manager.type";

export interface IAccountManagerEndpoint {
  registerRoute(): void;
  signin(req: Body): Promise<TSigninRes | undefined>;
  signup(req: Body): Promise<string | undefined>;
}
