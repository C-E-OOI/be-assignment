import { IAccountManagerService } from "@/AccountManager/domain/account-manager.interface";
import { INVALID_INPUT, NOT_FOUND } from "@/AccountManager/constant/account-manager.constant";
import { IAccountManagerQuery } from "./account-manager.interface";

export class AccountManagerQuery implements IAccountManagerQuery {
  private _service;
  private _hasher;

  constructor(edtechService: IAccountManagerService) {
    this._service = edtechService;
    this._hasher = Bun.password;
  }

  private _validateEmail = (param: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(param);
  };

  async signin(email: string, password: string): Promise<any> {
    if (!email || !password) {
      return INVALID_INPUT;
    }

    if (!this._validateEmail(email)) {
      return "Invalid Email";
    }

    const existingUser = await this._service.get(email);
    if (!existingUser) {
      return `User ${NOT_FOUND}`;
    }

    const validPassword = await Bun.password.verify(password, existingUser.password);

    if (!validPassword) {
      return "Invalid Credentials";
    }

    return {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };
  }
}
