import { api } from "@/lib/api";
import { sticketRegExp } from "@/lib/stiker";
import { urls } from "@/lib/urls";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { IChat, IMessage } from "@/types";
import { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

interface Props {
  className?: string;
  lastNewMessage?: IMessage;
}

const ChatList: FC<Props> = ({ className, lastNewMessage }) => {
  const [chatList, setChatList] = useState<IChat[]>([]);
  const { id } = useParams();
  const { user } = useAuthStore();

  useEffect(() => {
    api.get<IChat[]>(urls.chat.getAll).then(({ data }) => {
      setChatList(data);
    });
  }, []);

  return (
    <aside className={cn("sticky lg:basis-[300px] top-0 left-0 max-h-screen border-r-2 border-gray-100", className)}>
      {chatList.map((chat) => {
        const lastMessage = lastNewMessage?.chat.id === chat.id ? lastNewMessage : chat.messages[0];
        const isMe = user?.id === lastMessage?.user?.id;

        return (
          <Link
            to={`/chat/${chat.id}`}
            key={chat.id}
            className={cn(
              "block py-5 px-3 border-b border-gray-100 hover:bg-gray-100 transition-all",
              id === chat.id && "bg-gray-100"
            )}
          >
            <p className="font-semibold mb-1">{chat.name}</p>
            {lastMessage && (
              <p className="text-gray-900 text-xs">
                {isMe ? "Вы" : lastMessage?.user?.username}:{" "}
                {sticketRegExp.test(lastMessage.content) ? "стикер" : lastMessage.content}
              </p>
            )}
          </Link>
        );
      })}
    </aside>
  );
};

export default ChatList;
