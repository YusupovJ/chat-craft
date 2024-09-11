import { useChatList } from "@/hooks/useChat";
import { sticketRegExp } from "@/lib/stiker";
import { cn, formatContent } from "@/lib/utils";
import { useAuthStore } from "@/store/auth";
import { IMessage } from "@/types";
import { Dispatch, FC, SetStateAction } from "react";
import { Link, useParams } from "react-router-dom";
import { icons } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  lastNewMessage?: IMessage;
  className?: string;
  setSize?: Dispatch<SetStateAction<boolean>>;
  size?: boolean;
}

const ChatList: FC<Props> = ({ size, setSize, lastNewMessage, className }) => {
  const { id } = useParams();
  const { user } = useAuthStore();

  const { data: chatList } = useChatList();

  if (!chatList?.length) {
    return <h4 className={cn("text-muted-foreground text-lg text-center mt-5", className)}>У вас нету чатов</h4>;
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <Button variant="ghost" className="w-20 ml-auto" onClick={() => setSize?.(size ? false : true)}>
        <icons.ArrowBigLeft className={cn(size ? "rotate-180" : "rotate-0", "transition-all")} />
      </Button>
      {chatList.map((chat) => {
        const lastMessage = lastNewMessage?.chat.id === chat.id ? lastNewMessage : chat.messages[0];
        const isMe = user?.id === lastMessage?.user?.id;

        return (
          <Link
            to={`/chat/${chat.id}`}
            key={chat.id}
            className={cn("block py-5 px-3 hover:bg-muted transition-all", id === chat.id && "bg-muted")}
          >
            <p className="font-semibold mb-1">{formatContent(chat.name, size ? 10 : 20)}</p>
            {lastMessage && !size && (
              <p className="text-muted-foreground text-xs">
                {isMe ? "Вы" : lastMessage?.user?.username}:{" "}
                {sticketRegExp.test(lastMessage.content) ? "стикер" : formatContent(lastMessage.content)}
              </p>
            )}
          </Link>
        );
      })}
    </div>
  );
};

export default ChatList;
