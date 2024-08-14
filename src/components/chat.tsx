import { useNavigate, useParams } from "react-router-dom";
import ChatInfo from "./chatInfo";
import MessageList from "./messageList";
import WriteMessage from "./writeMessage";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import { getToken } from "@/lib/tokens";
import { IApiReponse, IMessage } from "@/types";

const Chat = () => {
  const { id } = useParams();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const isAuth = useAuthStore((state) => state.accessToken);
  const userId = useAuthStore((state) => state.id);
  const username = useAuthStore((state) => state.username);
  const avatar = useAuthStore((state) => state.avatar);
  const navigate = useNavigate();
  const accessToken = getToken("accessToken");

  useEffect(() => {
    if (!isAuth && !accessToken) {
      toast.error("Пройдите регистрацию");
      navigate("/");
    }
  }, [isAuth, accessToken]);

  useEffect(() => {
    if (id) {
      api
        .get<any, IApiReponse<IMessage[]>>(urls.message.getAll(id))
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
  }, []);

  return (
    <main className="bg-gray-200 min-h-screen px-4 pb-20 pt-5">
      <ChatInfo />
      <MessageList messages={messages} me={{ id: userId, username, avatar }} />
      <WriteMessage setMessages={setMessages} />
    </main>
  );
};

export default Chat;
