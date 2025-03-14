import { Controller, Get, Post, Body, UseGuards, Req, Patch } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { AuthGuard } from "src/helpers/authGuard";
import { IRequest } from "src/helpers/types";
import { refreshDto } from "./dto/refresh.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/signup")
  async create(@Body() createAuthDto: CreateAuthDto) {
    return await this.authService.create(createAuthDto);
  }

  @Post("/login")
  async login(@Body() body: CreateAuthDto) {
    return this.authService.login(body);
  }

  @Get("me")
  @UseGuards(AuthGuard)
  async me(@Req() req: IRequest) {
    return await this.authService.me(req.userId);
  }

  @Post("/refresh")
  refresh(@Body() body: refreshDto) {
    return this.authService.refresh(body);
  }

  @Patch("/update")
  @UseGuards(AuthGuard)
  async update(@Req() req: IRequest, @Body() body: UpdateAuthDto) {
    return await this.authService.update(req.userId, body);
  }

  @Post("/logout")
  @UseGuards(AuthGuard)
  async logout(@Req() req: IRequest) {
    return await this.authService.logout(req.userId);
  }
}
