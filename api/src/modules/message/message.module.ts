import { Module } from "@nestjs/common";
import { MessageGateway } from "./message.gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "./entities/message.entity";
import { Auth } from "../auth/entities/auth.entity";
import { Chat } from "../chat/entities/chat.entity";
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [TypeOrmModule.forFeature([Message, Auth, Chat])],
  providers: [MessageGateway, MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
