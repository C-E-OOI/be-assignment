import { Request } from "express";

export interface TypedRequest<T extends Record<string,any> = {}> extends Request {
    body : T
} 

// export interface TypedResponse<T> extends Response {
//     json: (data: T) => TypedResponse<T>
// }