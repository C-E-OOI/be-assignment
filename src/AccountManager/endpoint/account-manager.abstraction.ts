import Elysia from "elysia";
import { TSigninRes } from "../constant/account-manager.type";

export interface IAccountManagerEndpoint {
  registerRoute(): Promise<{ default: Elysia | undefined }>;
  signin(req: Body): Promise<TSigninRes | undefined>;
  signup(req: Body): Promise<string | undefined>;
}
