import { api } from "@/lib/api";
import { sticketRegExp } from "@/lib/stiker";
import { urls } from "@/lib/urls";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { IChat, IMessage } from "@/types";
import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Props {
  lastNewMessage?: IMessage;
  className?: string;
}

const ChatList: FC<Props> = ({ lastNewMessage, className }) => {
  const [chatList, setChatList] = useState<IChat[]>([]);
  const { id } = useParams();
  const { user } = useAuthStore();

  useEffect(() => {
    api.get<IChat[]>(urls.chat.getAll).then(({ data }) => {
      setChatList(data);
    });
  }, []);

  if (!chatList.length) {
    return <h4 className="text-muted-foreground text-center mt-5">Чатов у вас нет</h4>;
  }

  return (
    <div className={cn("flex flex-col", className)}>
      {chatList.map((chat) => {
        const lastMessage = lastNewMessage?.chat.id === chat.id ? lastNewMessage : chat.messages[0];
        const isMe = user?.id === lastMessage?.user?.id;

        return (
          <Link
            to={`/chat/${chat.id}`}
            key={chat.id}
            className={cn("block py-5 px-3 hover:bg-muted transition-all", id === chat.id && "bg-muted")}
          >
            <p className="font-semibold mb-1">{chat.name}</p>
            {lastMessage && (
              <p className="text-muted-foreground text-xs">
                {isMe ? "Вы" : lastMessage?.user?.username}:{" "}
                {sticketRegExp.test(lastMessage.content) ? "стикер" : lastMessage.content}
              </p>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default ChatList;
