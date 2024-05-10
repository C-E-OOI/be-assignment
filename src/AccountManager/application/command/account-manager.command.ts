import { IAccountManagerService } from "@/AccountManager/domain/account-manager.abstraction";
import { IAccountManagerCommand } from "./account-manager.abstraction";
import { TInsert } from "@/AccountManager/constant/account-manager.type";

export class AccountManagerCommand implements IAccountManagerCommand {
  private _service;
  constructor(edtechService: IAccountManagerService) {
    this._service = edtechService;
  }

  async signup(DTO: TInsert): Promise<string> {
    const user = await this._service.add(DTO);
    return `Welcome ${user.name} please login with this email: ${user.email}`;
  }
}
