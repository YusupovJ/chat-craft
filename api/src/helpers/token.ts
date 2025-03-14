import { envConfig } from "src/config/env.config";
import { IPayload } from "./types";
import { sign, verify } from "jsonwebtoken";
import { UnauthorizedException } from "@nestjs/common";

class Token {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;
  private readonly accessExpire: string;
  private readonly refreshExpire: string;

  constructor() {
    this.accessSecret = envConfig.jwt.accessSecret;
    this.accessExpire = envConfig.jwt.accessExpire;
    this.refreshExpire = envConfig.jwt.refreshExpire;
    this.refreshSecret = envConfig.jwt.refreshSecret;
  }

  generateAccessToken(payload: IPayload) {
    return sign(payload, this.accessSecret, { expiresIn: this.accessExpire });
  }

  generateRefreshToken(payload: IPayload) {
    return sign(payload, this.refreshSecret, { expiresIn: this.refreshExpire });
  }

  verifyAccessToken(accessToken: string) {
    try {
      return verify(accessToken, this.accessSecret) as IPayload;
    } catch (error) {
      throw new UnauthorizedException("Неверный токен");
    }
  }

  verifyRefreshToken(refreshToken: string) {
    try {
      return verify(refreshToken, this.refreshSecret) as IPayload;
    } catch (error) {
      throw new UnauthorizedException("Неверный токен");
    }
  }
}

export default new Token();
