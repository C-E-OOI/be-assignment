import Elysia, { Cookie, t } from "elysia";
import { IAccountManagerQuery } from "../application/query/account-manager.interface";
import { IAccountManagerEndpoint, IBasicAuth, IJWT, IJwtAccessSetup, IJwtRefreshToken } from "./account-manager.interface";
import {
  TCustomSetElysia,
  TInsert,
  TInsertToken,
  TReqSignin,
  TReqSignup,
  TSigninRes,
  TSignupRes,
} from "../constant/account-manager.type";
import { STATUS_CODE } from "../constant/account-manager.constant";
import { randomUUID } from "crypto";
import { IAccountManagerCommand } from "../application/command/account-manager.interface";

export class AccountManagerEndpoint implements IAccountManagerEndpoint {
  private _TAG: string;
  private _query: IAccountManagerQuery;
  private _command: IAccountManagerCommand;
  private _router: Elysia<"/auth">;
  private _basicAuthModel;
  private _jwtAccessSetup;
  private _jwtRefreshSetup;

  constructor(
    query: IAccountManagerQuery,
    command: IAccountManagerCommand,
    router: Elysia<"/auth">,
    basicAuthModel: IBasicAuth,
    jwtAccessSetup: IJwtAccessSetup,
    jwtRefreshSetup: IJwtRefreshToken
  ) {
    this._query = query;
    this._command = command;
    this._router = router;
    this._TAG = "AccountManagerEndpoint";
    this._basicAuthModel = basicAuthModel;
    this._jwtAccessSetup = jwtAccessSetup;
    this._jwtRefreshSetup = jwtRefreshSetup;
  }

  registerRoute(): any {
    return this._router
      .use(this._basicAuthModel)
      .use(this._jwtAccessSetup)
      .use(this._jwtRefreshSetup)

      .post(
        "/signin",
        async ({
          jwtAccess,
          jwtRefresh,
          cookie: { auth },
          body,
        }: {
          jwtAccess: Record<string, string | number> & IJWT;
          jwtRefresh: Record<string, string | number> & IJWT;
          cookie: { auth: Cookie<any> };
          body: TReqSignin;
        }) => await this.signin(jwtAccess, jwtRefresh, auth, body),
        {
          body: "basicAuthModel",
          afterHandle({ response, set }: { response: TSigninRes | any; set: TCustomSetElysia }) {
            if (response.statusCode === 200) {
              console.log(response);
              set.cookie = { token: { value: response.token } };
              set.status = response.statusCode;
              return response.message;
            }
            set.status = STATUS_CODE.BAD_REQUEST;
            return new Response(response);
          },
        }
      )
      .post("/signup", async ({ body }: { body: TReqSignup }) => await this.signup(body), {
        body: t.Object({
          name: t.String({ minLength: 10, maxLength: 50 }),
          role: t.String({ minLength: 2, maxLength: 10 }),
          email: t.String({ minLength: 10, maxLength: 50 }),
          password: t.String({ minLength: 8, maxLength: 32 }),
        }),
      });
  }

  async signin(
    jwtAccess: Record<string, string | number> & IJWT,
    jwtRefresh: Record<string, string | number> & IJWT,
    auth: Cookie<any>,
    req: TReqSignin
  ): Promise<TSigninRes | undefined> {
    try {
      const { email, password } = req;
      const dataRes = await this._query.signin(email, password);
      console.info(`${this._TAG} dataRes: ${JSON.stringify(dataRes)}`);

      const refreshId = randomUUID();
      const refreshToken = await jwtRefresh.sign({
        id: refreshId,
      });
      const hashedToken = new Bun.CryptoHasher("sha512").update(refreshToken).digest("hex");
      const dtoRefreshToken: TInsertToken = {
        hashedToken: hashedToken,
        id: refreshId,
        userId: dataRes.id,
      };
      await this._command.refreshToken(dtoRefreshToken);
      auth.set({
        value: await jwtAccess.sign({
          id: String(dataRes.id),
        }),
        httpOnly: true,
        maxAge: 1 * 86400,
        path: "/api/transaction",
      });

      return {
        message: dataRes,
        token: auth.value,
        statusCode: STATUS_CODE.OK,
      };
    } catch (err: any) {
      console.error(`${this._TAG} Got Error at func signin: ${err.message}`);
    }
  }

  async signup(req: TReqSignup): Promise<TSignupRes | undefined> {
    try {
      const { name, role, email, password } = req;
      const dto: TInsert = {
        name: name,
        role: role,
        email: email,
        password: password,
      };
      const dataRes = await this._command.signup(dto);
      console.info(`${this._TAG} dataRes: ${dataRes}`);
      return {
        message: dataRes,
        statusCode: STATUS_CODE.OK,
      };
    } catch (err: any) {
      console.error(`${this._TAG} Got Error at func signup: ${err.message}`);
      return {
        message: err.message,
        statusCode: STATUS_CODE.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
