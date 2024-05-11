import Elysia, { t } from "elysia";
import { IAccountManagerCommand } from "../application/command/account-manager.interface";
import { IAccountManagerQuery } from "../application/query/account-manager.interface";
import { IAccountManagerEndpoint } from "./account-manager.interface";
import { TCustomSetElysia, TInsert, TReqSignin, TReqSignup, TSigninRes, TSignupRes } from "../constant/account-manager.type";
import { STATUS_CODE } from "../constant/account-manager.constant";

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
      console.info(`${this._TAG} dataRes: ${JSON.stringify(dataRes)}`);
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
