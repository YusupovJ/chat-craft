import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { dbConfig } from "./config/db.config";
import { AuthModule } from "./modules/auth/auth.module";
import { ChatModule } from "./modules/chat/chat.module";
import { MessageModule } from './modules/message/message.module';
import { UploadModule } from './modules/upload/upload.module';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), AuthModule, ChatModule, MessageModule, UploadModule],
})
export class AppModule {}
