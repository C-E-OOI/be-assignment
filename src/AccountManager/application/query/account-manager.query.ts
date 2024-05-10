import { EdtechServiceInterface } from "@/AccountManager/domain/account-manager.abstraction";
import { EdtechQueryInterface } from "./account-manager.abstraction";
import { INVALID_INPUT, NOT_FOUND } from "@/AccountManager/constant/account-manager.constant";
// import { INVALID_INPUT, NOT_FOUND } from "@/core/constant/edtech.constant";

export class EdtechQuery implements EdtechQueryInterface {
  private _service;
  constructor(edtechService: EdtechServiceInterface) {
    this._service = edtechService;
  }
  async list(): Promise<string[]> {
    return await this._service.list();
  }

  async get(userId: string): Promise<string> {
    const user = await this._service.get(userId);
    if (!user) {
      return "User not found.";
    }

    if (user.role != "user") {
      return "Bad Request Auth";
    }

    return await this._service.get(user.userId);
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

  async downloadMateri(userId: string, filePath: string): Promise<string> {
    const materi = await this.get(userId);
    return materi;
  }
}
