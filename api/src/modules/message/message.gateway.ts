import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CreateImageDto, CreateMessageDto, CreateVoiceDto } from "./dto/create-message.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Auth } from "../auth/entities/auth.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { Chat } from "../chat/entities/chat.entity";
import { Message } from "./entities/message.entity";
import * as fs from "fs/promises";
import * as path from "path";
import { envConfig } from "src/config/env.config";
import { MessageService } from "./message.service";
import { ApiTags } from "@nestjs/swagger";

@WebSocketGateway({ cors: { origin: "*" } })
export class MessageGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @InjectRepository(Message) private readonly messageRepo: Repository<Message>,
    private readonly messageService: MessageService,
  ) {}

  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: Socket, payload: { chatId: string; userId: string }) {
    const { chatId } = payload;
    client.join(chatId);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, payload: { chatId: string }) {
    const { chatId } = payload;
    client.leave(chatId);
  }

  @SubscribeMessage("message")
  async handleMessage(client: Socket, message: CreateMessageDto) {
    const { chat, user } = await this.messageService.areExist(message.userId, message.chatId);
    let reply = null;

    if (message.replyId) {
      const resultReply = await this.messageRepo.findOne({ where: { id: message.replyId } });
      if (!resultReply) {
        throw new NotFoundException("reply alert exist");
      }
      reply = resultReply;
    }

    const newMessage = new Message();
    newMessage.content = message.content;
    newMessage.type = message.type;
    newMessage.user = user;
    newMessage.chat = chat;
    newMessage.reply = reply;

    await this.messageRepo.save(newMessage);

    this.server.to(chat.id).emit("reply", newMessage);
  }

  @SubscribeMessage("voice")
  async handleVoice(client: Socket, message: CreateVoiceDto) {
    const { chat, user } = await this.messageService.areExist(message.userId, message.chatId);

    const filename = `${message.chatId}-${message.userId}-${Date.now()}.webm`;
    const filepath = path.resolve("uploads", filename);

    await fs.writeFile(filepath, message.audioBlob);

    const audioUrl = `${envConfig.apiUrl}/upload/${filename}`;
    let reply = null;

    if (message.replyId) {
      const resultReply = await this.messageRepo.findOne({ where: { id: message.replyId } });
      if (!resultReply) {
        throw new NotFoundException("reply alert exist");
      }
      reply = resultReply;
    }

    const newMessage = new Message();
    newMessage.content = audioUrl;
    newMessage.chat = chat;
    newMessage.user = user;
    newMessage.type = message.type;
    newMessage.reply = reply;

    await this.messageRepo.save(newMessage);

    this.server.to(chat.id).emit("reply", newMessage);
  }

  @SubscribeMessage("image")
  async handleImage(client: Socket, message: CreateImageDto) {
    const { chat, user } = await this.messageService.areExist(message.userId, message.chatId);
    let reply = null;

    if (message.replyId) {
      const resultReply = await this.messageRepo.findOne({ where: { id: message.replyId } });
      if (!resultReply) {
        throw new NotFoundException("reply alert exist");
      }
      reply = resultReply;
    }

    const newMessage = new Message();
    newMessage.content = message.images.join(" ");
    newMessage.chat = chat;
    newMessage.user = user;
    newMessage.type = message.type;
    newMessage.reply = reply;

    await this.messageRepo.save(newMessage);

    this.server.to(chat.id).emit("reply", newMessage);
  }
}
