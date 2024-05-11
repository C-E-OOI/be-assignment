import Elysia, { Cookie, UnwrapSchema } from "elysia";
import { TReqSignin, TReqSignup, TSigninRes, TSignupRes } from "../constant/account-manager.type";
import { JWTPayloadSpec } from "@elysiajs/jwt";


export interface IJWT extends JWTPayloadSpec {
  verify(param: string): Promise<string>;
  sign(morePayload: Record<string, string | number> & JWTPayloadSpec): Promise<boolean>;
}
export interface IAccountManagerEndpoint {
  registerRoute(): Promise<{ default: Elysia | undefined }>;
  signin(jwt: Record<string, string | number> & IJWT, auth: Cookie<any>, req: TReqSignin): Promise<TSigninRes | undefined>;
  signup(req: TReqSignup): Promise<TSignupRes | undefined>;
}
