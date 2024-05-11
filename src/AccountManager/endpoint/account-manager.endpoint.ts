import Elysia, { Cookie, t } from "elysia";
import { IAccountManagerCommand } from "../application/command/account-manager.interface";
import { IAccountManagerQuery } from "../application/query/account-manager.interface";
import { IAccountManagerEndpoint, IJWT } from "./account-manager.interface";
import { TCustomSetElysia, TInsert, TReqSignin, TReqSignup, TSigninRes, TSignupRes } from "../constant/account-manager.type";
import { STATUS_CODE } from "../constant/account-manager.constant";
import jwt, { JWTPayloadSpec } from "@elysiajs/jwt";

export class AccountManagerEndpoint implements IAccountManagerEndpoint {
  private _TAG: string;
  private _query: IAccountManagerQuery;
  private _command: IAccountManagerCommand;
  private _router: Elysia<"/auth">;
  constructor(query: IAccountManagerQuery, command: IAccountManagerCommand, router: Elysia<"/auth">) {
    this._query = query;
    this._command = command;
    this._router = router;
    this._TAG = "AccountManagerEndpoint";
  }

  registerRoute(): any {
    return this._router
      .use(
        jwt({
          name: "jwt",
          secret: "Fischl von Luftschloss Narfidort",
        })
      )
      .get("/sign/:name", async ({ jwt, cookie: { auth }, params }) => {
        auth.set({
          value: await jwt.sign(params),
          httpOnly: true,
          maxAge: 7 * 86400,
          path: "/profile",
        });

        return `Sign in as ${auth.value}`;
      })
      .post(
        "/signin",
        async ({
          jwt,
          cookie: { auth },
          body,
        }: {
          jwt: Record<string, string | number> & IJWT;
          cookie: { auth: Cookie<any> };
          body: TReqSignin;
        }) => await this.signin(jwt, auth, body),
        {
          body: t.Object({
            email: t.String({ minLength: 10, maxLength: 100 }),
            password: t.String({ minLength: 8, maxLength: 80 }),
          }),
          afterHandle({ response, set }: { response: TSigninRes | any; set: TCustomSetElysia }) {
            if (response.statusCode === 200) {
              console.log(response);
              set.cookie = { token: { value: response.message.token } };
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
    jwt: Record<string, string | number> & IJWT,
    auth: Cookie<any>,
    req: TReqSignin
  ): Promise<TSigninRes | undefined> {
    try {
      const { email, password } = req;
      const dataRes = await this._query.signin(email, password);
      console.info(`${this._TAG} dataRes: ${JSON.stringify(dataRes)}`);

      const a = auth.set({
        value: await jwt.sign(req),
        httpOnly: true,
        maxAge: 7 * 86400,
        path: "/transaction",
      });

      console.log(a);

      return {
        message: dataRes,
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
