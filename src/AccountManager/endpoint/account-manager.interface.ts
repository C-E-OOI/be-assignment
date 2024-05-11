import Elysia, { Cookie, UnwrapSchema } from "elysia";
import { TReqSignin, TReqSignup, TSigninRes, TSignupRes } from "../constant/account-manager.type";
import { JWTPayloadSpec } from "@elysiajs/jwt";

export interface IJWT extends JWTPayloadSpec {
  verify(param: string): Promise<string>;
  sign(morePayload: Record<string, string | number> & JWTPayloadSpec): Promise<Bun.BlobOrStringOrBuffer>;
}
export interface IAccountManagerEndpoint {
  registerRoute(): Promise<{ default: Elysia | undefined }>;
  signin(
    jwtAccess: Record<string, string | number> & IJWT,
    jwtRefresh: Record<string, string | number> & IJWT,
    auth: Cookie<any>,
    req: TReqSignin
  ): Promise<TSigninRes | undefined>;
  signup(req: TReqSignup): Promise<TSignupRes | undefined>;
}

export interface IBasicAuth
  extends Elysia<
    "",
    false,
    { decorator: {}; store: {}; derive: {}; resolve: {} },
    { type: { readonly basicAuthModel: { email: string; password: string } }; error: {} },
    { schema: {}; macro: {} },
    {},
    { derive: {}; resolve: {}; schema: {} },
    { derive: {}; resolve: {}; schema: {} }
  > {}

export interface IJwtAccessSetup
  extends Elysia<
    "",
    false,
    {
      decorator: {
        jwtAccess: {
          readonly sign: (morePayload: { id: string } & JWTPayloadSpec) => Promise<string>;
          readonly verify: (jwt?: string | undefined) => Promise<false | ({ id: string } & JWTPayloadSpec)>;
        };
      };
      store: {};
      derive: {};
      resolve: {};
    },
    { type: {}; error: {} },
    { schema: {}; macro: {} },
    {},
    { derive: {}; resolve: {}; schema: {} },
    { derive: {}; resolve: {}; schema: {}; decorator: {}; store: {} }
  > {}

export interface IJwtRefreshToken
  extends Elysia<
    "",
    false,
    {
      decorator: {
        jwtRefresh: {
          readonly sign: (morePayload: { id: string } & JWTPayloadSpec) => Promise<string>;
          readonly verify: (jwt?: string | undefined) => Promise<false | ({ id: string } & JWTPayloadSpec)>;
        };
      };
      store: {};
      derive: {};
      resolve: {};
    },
    { type: {}; error: {} },
    { schema: {}; macro: {} },
    {},
    { derive: {}; resolve: {}; schema: {} },
    { derive: {}; resolve: {}; schema: {}; decorator: {}; store: {} }
  > {}
