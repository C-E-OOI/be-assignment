import Elysia from "elysia";
import { TReqSignin, TReqSignup, TSigninRes, TSignupRes } from "../constant/account-manager.type";

export interface IAccountManagerEndpoint {
  registerRoute(): Promise<{ default: Elysia | undefined }>;
  signin(req: TReqSignin): Promise<TSigninRes | undefined>;
  signup(req: TReqSignup): Promise<TSignupRes | undefined>;
}
