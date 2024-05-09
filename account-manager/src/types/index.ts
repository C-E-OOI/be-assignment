import { TypedRequest } from "./express";


export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginResponseBody {
  user: any;
}
  
export type LoginRequest = TypedRequest<LoginRequestBody>;
// export type LoginResponse = TypedResponse<LoginResponseBody>;