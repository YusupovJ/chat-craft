import { useNavigate, useParams } from "react-router-dom";
import ChatInfo from "./chatInfo";
import MessageList from "./messageList";
import WriteMessage from "./writeMessage";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { useAuthStore } from "@/store/auth";
import { toast } from "sonner";
import { IMessage } from "@/types";

const Chat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allowScroll, setAllowScroll] = useState(true);
  const [scrolledToTop, setScrolledToTop] = useState(false);
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Пройдите регистрацию");
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (id && page <= totalPages) {
      api
        .get<IMessage[]>(urls.message.getAll(id, page))
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
      <MessageList messages={messages} me={user} />
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
