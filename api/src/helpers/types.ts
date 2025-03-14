import { Request } from "express";

export interface IPayload {
  userId: number;
}

export interface IRequest extends Request {
  userId: number;
}
