import { IAccountManagerService } from "@/AccountManager/domain/account-manager.interface";
import { TInsert, TInsertToken } from "@/AccountManager/constant/account-manager.type";
import { IAccountManagerCommand } from "./account-manager.interface";

export class AccountManagerCommand implements IAccountManagerCommand {
  private _service;
  constructor(edtechService: IAccountManagerService) {
    this._service = edtechService;
  }
  async refreshToken(DTO: TInsertToken): Promise<void> {
    await this._service.addToken(DTO);
  }

  private async validatePassword(password: string): Promise<boolean> {
    // Regular expressions for each required character type
    const numberRegex = /\d/;
    const letterRegex = /[a-zA-Z]/;
    const symbolRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;

    // Check if the password meets the criteria
    const hasNumber = numberRegex.test(password);
    const hasLetter = letterRegex.test(password);
    const hasSymbol = symbolRegex.test(password);

    // Return true if all conditions are met, false otherwise
    return hasNumber && hasLetter && hasSymbol;
  }

  async signup(DTO: TInsert): Promise<string> {
    const validatePassword = await this.validatePassword(DTO.password);
    if (!validatePassword) {
      return "Invalid password must be combination of  letters, numbers and symbols to be more secure";
    }

    const getUser = await this._service.get(DTO.email);
    if (getUser) {
      return "Email already in use";
    }
    const user = await this._service.add(DTO);
    return `Welcome ${user.name} please login with this email: ${user.email}`;
  }
}
