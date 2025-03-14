import { MessageTypeEnum } from "src/helpers/enums";
import { RootEntity } from "src/helpers/root.entity";
import { Auth } from "src/modules/auth/entities/auth.entity";
import { Chat } from "src/modules/chat/entities/chat.entity";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class Message extends RootEntity {
  @Column("text")
  content: string;

  @Column({ type: "enum", enum: MessageTypeEnum, default: MessageTypeEnum.text })
  type: MessageTypeEnum;

  @ManyToOne(() => Message, { onDelete: "CASCADE" })
  reply?: Message;

  @ManyToOne(() => Auth, { onDelete: "CASCADE" })
  user: Auth;

  @ManyToOne(() => Chat, { onDelete: "CASCADE" })
  chat: Chat;
}
