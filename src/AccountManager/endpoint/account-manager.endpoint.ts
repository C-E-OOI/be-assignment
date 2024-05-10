import Elysia, { t } from "elysia";
import { IAccountManagerCommand } from "../application/command/account-manager.abstraction";
import { IAccountManagerQuery } from "../application/query/account-manager.abstraction";
import { IAccountManagerEndpoint } from "./account-manager.abstraction";
import { TInsert, TSigninRes } from "../constant/account-manager.type";

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

  async registerRoute(): Promise<any> {
    this._router
      .get("/signin", async ({ body }: { body: Body }) => await this.signin(body), {
        body: t.Object({
          email: t.String({ minLength: 10, maxLength: 50 }),
          password: t.String({ minLength: 8, maxLength: 32 }),
        }),
      })
      .post("/signup", async ({ body }: { body: Body }) => await this.signup(body), {
        body: t.Object({
          username: t.String({ minLength: 10, maxLength: 50 }),
          role: t.String({ minLength: 5, maxLength: 10 }),
          email: t.String({ minLength: 10, maxLength: 50 }),
          password: t.String({ minLength: 8, maxLength: 32 }),
        }),
      });
  }

  async signin(req: Body): Promise<TSigninRes | undefined> {
    try {
      const { email, password } = req.body as any;
      const dataRes = await this._query.signin(email, password);
      console.info(`${this._TAG} dataRes: ${dataRes}`);
      return dataRes;
    } catch (err: any) {
      console.error(`${this._TAG} Got Error at func signin: ${err.message}`);
    }
  }

  async signup(req: Body): Promise<string | undefined> {
    try {
      const { name, role, email, password } = req.body as any;
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
