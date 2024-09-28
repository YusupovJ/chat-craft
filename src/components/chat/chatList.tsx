import { useChatList } from "@/hooks/useChat";
import { cn, cutTextOnLimit } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { IMessage } from "@/types";
import { Dispatch, FC, SetStateAction } from "react";
import { Link, useParams } from "react-router-dom";
import notImage from "../../assets/Modicon_No_Chat_Reports.webp";

interface Props {
  lastNewMessage?: IMessage;
  className?: string;
  setSize?: Dispatch<SetStateAction<boolean>>;
  size?: boolean;
}

export const ChatList: FC<Props> = ({ size, lastNewMessage, className }) => {
  const { id } = useParams();
  const { user } = useAuthStore();
  const { data: chatList } = useChatList();

  if (!chatList?.length) {
    return <h4 className={cn("text-muted-foreground text-lg text-center mt-5", className)}>У вас нету чатов</h4>;
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
            className={cn(
              "flex py-5 px-3 gap-3 items-center hover:bg-muted transition-all",
              id === chat.id && "bg-muted"
            )}
          >
            <img
              src={chat.img || notImage}
              className={cn("min-w-16 w-16 h-16 rounded-md object-cover transition-all", size && "min-w-20")}
              alt="chat icon"
            />
            {!size && (
              <div>
                <p className="font-semibold mb-1">{cutTextOnLimit(chat.name, size ? 10 : 20)}</p>
                {lastMessage && (
                  <p className="text-muted-foreground text-xs mt-2 flex item-center">
                    {isMe ? "Вы" : lastMessage?.user?.username}:{" "}
                    {lastMessage.type === "sticker" ? "Стикер" : cutTextOnLimit(lastMessage.content, 15)}
                  </p>
                )}
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
};
