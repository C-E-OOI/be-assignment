import { IAccountManagerService } from "@/AccountManager/domain/account-manager.abstraction";
import { INVALID_INPUT, NOT_FOUND } from "@/AccountManager/constant/account-manager.constant";
import { IAccountManagerQuery } from "./account-manager.abstraction";

export class AccountManagerQuery implements IAccountManagerQuery {
  private _service;
  constructor(edtechService: IAccountManagerService) {
    this._service = edtechService;
  }

  async signin(email: string, password: string): Promise<any> {
    if (!email || !password) {
      return `Login - ${INVALID_INPUT}`;
    }

    const user = await this._service.get(email);
    if (!user) {
      return `Login ${NOT_FOUND}`;
    }

    return {
      token: Math.random().toString(36),
      email: user.email,
      role: user.role,
    };
  }
}
