import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { UpdateAuthDto } from "./dto/update-auth.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "./entities/auth.entity";
import { Repository } from "typeorm";
import { compareSync, hashSync } from "bcrypt";
import token from "src/helpers/token";
import { ApiResponse } from "src/helpers/apiResponse";
import { refreshDto } from "./dto/refresh.dto";

@Injectable()
export class AuthService {
  constructor(@InjectRepository(Auth) private readonly authService: Repository<Auth>) {}
  async create(createAuthDto: CreateAuthDto) {
    const newUser = new Auth();

    const user = await this.authService.findOne({ where: { username: createAuthDto.username } });

    if (user) {
      throw new BadRequestException("Пользователь уже существует");
    }

    newUser.username = createAuthDto.username;
    newUser.avatar = createAuthDto.avatar;
    newUser.gender = createAuthDto.gender;
    newUser.password = hashSync(createAuthDto.password, 3);

    const savedUser = await this.authService.save(newUser);

    const accessToken = token.generateAccessToken({ userId: savedUser.id });
    const refreshToken = token.generateRefreshToken({ userId: savedUser.id });

    savedUser.token = hashSync(refreshToken, 3);

    await this.authService.save(savedUser);

    return new ApiResponse({ accessToken, refreshToken });
  }

  async login(body: CreateAuthDto) {
    const user = await this.authService.findOne({ where: { username: body.username } });

    if (!user) {
      throw new NotFoundException("Имя или пароль неверны");
    }

    const checkPassword = compareSync(body.password, user.password);
    if (!checkPassword) {
      throw new BadRequestException("Имя или пароль неверны");
    }

    const accessToken = token.generateAccessToken({ userId: user.id });
    const refreshToken = token.generateRefreshToken({ userId: user.id });

    user.token = hashSync(refreshToken, 3);

    await this.authService.save(user);

    return new ApiResponse({ accessToken, refreshToken });
  }

  async me(id: number) {
    const user = await this.authService.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException("Пользователь не найден");
    }
    const users = { username: user.username, avatar: user.avatar, id: user.id, gender: user.gender };

    return new ApiResponse(users);
  }

  async refresh(body: refreshDto) {
    const { userId } = token.verifyRefreshToken(body.refreshToken);

    const user = await this.authService.findOne({ where: { id: userId } });
    if (!user) {
      throw new UnauthorizedException("Пользователь не найден");
    }

    const checkToken = compareSync(body.refreshToken, user.token);
    if (!checkToken) {
      throw new UnauthorizedException("Неверный Токен");
    }

    const accessToken = token.generateAccessToken({ userId: user.id });
    const refreshToken = token.generateRefreshToken({ userId: user.id });
    user.token = hashSync(refreshToken, 3);

    await this.authService.save(user);

    return new ApiResponse({ accessToken, refreshToken });
  }

  async update(id: number, body: UpdateAuthDto) {
    const user = await this.authService.findOneBy({ id });
    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }
    user.avatar = body.avatar ?? user.avatar;
    user.gender = body.gender ?? user.gender;
    user.username = body.username ?? user.username;

    await this.authService.save(user);
    return new ApiResponse("Ты обнавилса", 201);
  }

  async logout(id: number) {
    const user = await this.authService.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException("Пользователь не найден");
    }
    user.token = null;
    await this.authService.save(user);
    return new ApiResponse("Ты вышел из системы");
  }
}
