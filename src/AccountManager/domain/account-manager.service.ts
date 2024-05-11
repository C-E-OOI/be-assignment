import { TInsert } from "../constant/account-manager.type";
import { IAccountManagerRepository } from "../infrastructure/repository/account-manager.repository.interface";
import { IAccountManagerService } from "./account-manager.interface";

export class AccountManagerService implements IAccountManagerService {
  _repository: IAccountManagerRepository;
  constructor(repository: IAccountManagerRepository) {
    this._repository = repository;
  }

  async add(DTO: TInsert): Promise<any> {
    return await this._repository.insert(DTO);
  }

  async get(email: string): Promise<any> {
    return await this._repository.find(email);
  }
}
