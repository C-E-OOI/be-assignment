import { Request, Response } from "express";

export interface TypedRequest<T extends Record<string,any> = {}> extends Request {
    body : T
} 

export interface IGetUserAuthInfoRequest extends Request {
    user: {
        user : any,
        id : any
    }
  }

// export interface TypedResponse<T> extends Response {
//     json: (data: T) => TypedResponse<T>
// }