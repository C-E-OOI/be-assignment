export interface AccountManagerCommandInterface {
  signup(name: string, role: string, email: string, password: string): Promise<string>;
}
