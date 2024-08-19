import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { IChat } from "@/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ChatList = () => {
  const [chatList, setChatList] = useState<IChat[]>([]);
  const { id } = useParams();
  const { user } = useAuthStore();

  useEffect(() => {
    api.get<IChat[]>(urls.chat.getAll).then(({ data }) => {
      setChatList(data);
    });
  }, []);

  return (
    <aside className="sticky basis-1/6 top-0 left-0 max-h-screen border-r-2 border-gray-100">
      {chatList.map((chat) => {
        const lastMessage = chat.messages[chat.messages.length - 1];
        const isMe = lastMessage?.user?.id === user?.id;

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
                {isMe ? "Вы" : lastMessage.user.username}: {lastMessage.content}
              </p>
            )}
          </Link>
        );
      })}
    </aside>
  );
};

export default ChatList;
