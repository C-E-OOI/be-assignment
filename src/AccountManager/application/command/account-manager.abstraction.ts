export interface IAccountManagerCommand {
  signup(name: string, role: string, email: string, password: string): Promise<string>;
}
