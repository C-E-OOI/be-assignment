export interface IAccountManagerService {
  add(name: string, role: string, email: string, password: string): Promise<Record<string, string>>;
  get(email: string): Promise<any>;
}
