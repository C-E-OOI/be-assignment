import { EdtechRepository } from "../infrastructure/repository/account-manager.repository";
import { EdtechServiceInterface } from "./account-manager.abstraction";

export class EdtechService implements EdtechServiceInterface {
  _repository: EdtechRepository;
  constructor(repository: EdtechRepository) {
    this._repository = repository;
  }
  async addUser(name: string, role: string, email: string, password: string): Promise<any> {
    return await this._repository.insertUser(name, role, email, password);
  }
  async getUser(email: string): Promise<any> {
    return await this._repository.findUser(email);
  }

  async list(): Promise<string[]> {
    return await this._repository.findAll();
  }

  async get(id: string): Promise<string> {
    return await this._repository.find(id);
  }

  async add(userId: string, pathFile: string): Promise<string> {
    return await this._repository.insert(userId, pathFile);
  }
}
