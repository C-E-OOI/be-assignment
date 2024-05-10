import { EdtechServiceInterface } from "@/AccountManager/domain/account-manager.abstraction";
import { AccountManagerCommandInterface } from "./account-manager.abstraction";

export class AccountManagerCommand implements AccountManagerCommandInterface {
  private _service;
  constructor(edtechService: EdtechServiceInterface) {
    this._service = edtechService;
  }

  async signup(name: string, role: string, email: string, password: string): Promise<string> {
    const user = await this._service.add(name, role, email, password);
    return `Welcome ${user.name} please login with this email: ${user.email}`;
  }
}
