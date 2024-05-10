export interface EdtechServiceInterface {
  list(): Promise<string[]>;
  add(name: string, role: string, email: string, password: string): Promise<Record<string, string>>;
  get(email: string): Promise<any>;
}
