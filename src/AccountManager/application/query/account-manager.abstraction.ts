export interface EdtechQueryInterface {
  list(): Promise<string[]>;
  get(userId: string): Promise<string>;
  signin(email: string, password: string): Promise<{ data: { token: string; email: string } }>;
}
