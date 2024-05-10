export interface IAccountManagerQuery {
  signin(email: string, password: string): Promise<{ data: { token: string; email: string } }>;
}
