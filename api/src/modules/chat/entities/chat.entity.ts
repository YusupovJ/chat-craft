import { Auth } from "src/modules/auth/entities/auth.entity";
import { Message } from "src/modules/message/entities/message.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Chat {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column("varchar")
  name: string;

  @Column("varchar")
  img: string;

  @ManyToMany(() => Auth, (user) => user.chats)
  @JoinTable()
  users: Auth[];

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
