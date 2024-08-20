import { useNavigate, useParams } from "react-router-dom";
import ChatInfo from "./chatInfo";
import MessageList from "./messageList";
import WriteMessage from "./writeMessage";
import { FC, useEffect, useState } from "react";
import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import { IMessage } from "@/types";
import ChatList from "./chatList";
import { cn } from "@/lib/utils";

interface Props {
  unselected?: boolean;
}

const Chat: FC<Props> = ({ unselected }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Пройдите регистрацию");
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (id && !unselected) {
      api
        .get<IMessage[]>(urls.message.getAll(id, 1))
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err: any) => {
          if (err.response.status === 404) {
            navigate("/");
            toast.error("чат не найден");
          }
        });
    }
  }, [id]);

  return (
    <div className="flex relative">
      <ChatList className={cn(unselected ? "basis-full" : "hidden lg:block")} />
      <main
        className={cn("bg-gray-300 min-h-[100svh] relative grow", unselected && "flex items-center justify-center")}
      >
        {!unselected ? (
          <>
            <ChatInfo />
            <MessageList messages={messages} me={user} />
            <WriteMessage setMessages={setMessages} />
          </>
        ) : (
          <p className="bg-white hidden lg:inline-block p-2 font-bold">Выберите чат для общения</p>
        )}
      </main>
    </div>
  );
};

export default Chat;
