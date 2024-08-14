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
  const navigate = useNavigate();

  const isAuth = useAuthStore((state) => state.accessToken);
  const userId = useAuthStore((state) => state.id);
  const username = useAuthStore((state) => state.username);
  const avatar = useAuthStore((state) => state.avatar);
  const accessToken = getToken("accessToken");

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scrolledToTop, setScrolledToTop] = useState(false);
  const [allowScroll, setAllowScroll] = useState(true);

  useEffect(() => {
    if (!isAuth && !accessToken) {
      toast.error("Пройдите регистрацию");
      navigate("/");
    }
  }, [isAuth, accessToken]);

  useEffect(() => {
    if (id && page <= totalPages) {
      api
        .get<any, IApiReponse<IMessage[]>>(urls.message.getAll(id, page))
        .then((res) => {
          setMessages([...res.data.reverse(), ...messages]);
          setTotalPages(res.pagination?.totalPages || 1);
          setScrolledToTop(false);
        })
        .catch((err: any) => {
          if (err.response.status === 404) {
            navigate("/");
            toast.error("чат не найден");
          }
        });
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (!scrolledToTop && window.scrollY === 0) {
        setPage((page) => page + 1);
        setScrolledToTop(true);
        setAllowScroll(false);
      }
    });
  }, []);

  return (
    <main className="bg-gray-200 min-h-[100svh] px-4 pb-20 pt-5">
      <ChatInfo />
      <MessageList messages={messages} me={{ id: userId, username, avatar }} />
      <WriteMessage
        setMessages={setMessages}
        messages={messages}
        page={page}
        setAllowScroll={setAllowScroll}
        allowScroll={allowScroll}
      />
    </main>
  );
};

export default Chat;
