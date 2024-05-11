import Elysia, { t } from "elysia";
import { IAccountManagerCommand } from "../application/command/account-manager.interface";
import { IAccountManagerQuery } from "../application/query/account-manager.interface";
import { IAccountManagerEndpoint } from "./account-manager.interface";
import { TInsert, TReqSignin, TReqSignup, TSigninRes } from "../constant/account-manager.type";

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
      .post("/signin", async ({ body }: { body: TReqSignin }) => await this.signin(body), {
        body: t.Object({
          email: t.String({ minLength: 10, maxLength: 100 }),
          password: t.String({ minLength: 8, maxLength: 80 }),
        }),
      })
      .post("/signup", async ({ body }: { body: TReqSignup }) => await this.signup(body), {
        body: t.Object({
          name: t.String({ minLength: 10, maxLength: 50 }),
          role: t.String({ minLength: 2, maxLength: 10 }),
          email: t.String({ minLength: 10, maxLength: 50 }),
          password: t.String({ minLength: 8, maxLength: 32 }),
        }),
      });
  }

  async signin(req: TReqSignin): Promise<TSigninRes | undefined> {
    try {
      const { email, password } = req;

      const dataRes = await this._query.signin(email, password);
      console.info(`${this._TAG} dataRes: ` + dataRes);
      return dataRes;
    } catch (err: any) {
      console.error(`${this._TAG} Got Error at func signin: ${err.message}`);
    }
  }

  async signup(req: TReqSignup): Promise<string | undefined> {
    try {
      const { name, role, email, password } = req as any;
      const dto: TInsert = {
        name: name,
        role: role,
        email: email,
        password: password,
      };
      const dataRes = await this._command.signup(dto);
      console.info(`${this._TAG} dataRes: ${dataRes}`);
      return dataRes;
    } catch (err: any) {
      console.error(`${this._TAG} Got Error at func signup: ${err.message}`);
    }
  }
}
