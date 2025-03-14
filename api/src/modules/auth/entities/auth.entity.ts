import { EnumGender } from "src/helpers/enums";
import { RootEntity } from "src/helpers/root.entity";
import { Chat } from "src/modules/chat/entities/chat.entity";
import { Column, Entity, ManyToMany } from "typeorm";

@Entity()
export class Auth extends RootEntity {
  @Column("varchar")
  username: string;

  @Column("varchar")
  password: string;

  @Column({
    type: "enum",
    enum: EnumGender,
    default: EnumGender.steve,
  })
  gender: EnumGender;

  @Column("varchar", { nullable: true })
  token: string;

  @Column("integer", { default: 0 })
  avatar: number;

  @ManyToMany(() => Chat, (chat) => chat.users, { onDelete: "CASCADE" })
  chats: Chat[];
}
