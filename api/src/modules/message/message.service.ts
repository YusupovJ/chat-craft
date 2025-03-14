import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { GetMessagesDto } from "src/helpers/dto";
import { Message } from "./entities/message.entity";
import { Repository } from "typeorm";
import { Pagination } from "src/helpers/pagination";
import { Chat } from "../chat/entities/chat.entity";
import { Auth } from "../auth/entities/auth.entity";

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private readonly messageRepo: Repository<Message>,
    @InjectRepository(Chat) private readonly chatRepo: Repository<Chat>,
    @InjectRepository(Auth) private readonly authRepo: Repository<Auth>,
  ) {}

  async findAll({ chatId, limit, page }: GetMessagesDto, userId: number) {
    const chat = await this.chatRepo.findOne({
      where: { id: chatId },
      relations: ["users"],
    });

    if (!chat) {
      throw new NotFoundException("чат не найден");
    }

    const user = await this.authRepo.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException("пользователь не найден");
    }

    const isNewJoinedUser = !chat.users.find((user) => user.id === userId);

    if (isNewJoinedUser) {
      chat.users.push(user);
      await this.chatRepo.save(chat);
    }

    const totalItems = await this.messageRepo.count({
      where: { chat: { id: chatId } },
    });
    const pagintion = new Pagination(totalItems, page, limit);

    const messages = (
      await this.messageRepo.find({
        where: { chat: { id: chatId } },
        relations: ["user", "reply"],
        loadRelationIds: { relations: ["chat"] },
        order: {
          id: "DESC",
        },
        skip: pagintion.offset,
        take: pagintion.limit,
      })
    ).reverse();

    return { messages, pagintion };
  }

  async areExist(userId: number, chatId: string) {
    const user = await this.authRepo.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException("пользователь не найден");

    const chat = await this.chatRepo.findOne({ where: { id: chatId } });
    if (!chat) throw new NotFoundException("чат не найден");

    return { user, chat };
  }
}
