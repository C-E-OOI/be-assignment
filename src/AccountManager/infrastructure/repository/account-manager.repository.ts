export interface IAccountManagerRepository {
  insert(name: string, role: string, email: string, password: string): Promise<string>;
  find(email: string): Promise<string>;
}
