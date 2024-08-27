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
import { cn, scrollToBottom } from "@/lib/utils";
import { MESSAGE_LIMIT } from "@/lib/constants";

interface Props {
  unselected?: boolean;
}

const loadMessages = (id?: string, page?: number) => {
  return api.get<IMessage[]>(urls.message.getAll(id, page));
};

const Chat: FC<Props> = ({ unselected }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [newMessages, setNewMessages] = useState<IMessage[]>([]);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleError = (err: any) => {
    if (err.response.status === 404) {
      navigate("/");
      toast.error("чат не найден");
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Пройдите регистрацию");
      navigate("/");
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (page <= totalPages && !unselected && page !== 1) {
      loadMessages(id, page)
        .then((res) => {
          setMessages([...res.data, ...messages]);
        })
        .catch(handleError);
    }
  }, [page]);

  useEffect(() => {
    setPage(1);
    if (id && !unselected) {
      loadMessages(id)
        .then((res) => {
          setMessages(res.data);
          setNewMessages([]);
          setTotalPages(res.pagination?.totalPages || 1);
        })
        .catch(handleError);
    }
  }, [id]);

  useEffect(() => {
    if (page === 1) {
      scrollToBottom("instant");
      return;
    }

    const messages = document.querySelectorAll("[data-index]");

    if (messages.length) {
      const index = messages.length - MESSAGE_LIMIT * (page - 1) - newMessages.length;
      const top = messages[index]?.getBoundingClientRect().top;

      if (top) window.scrollTo({ top: top - 77 });
    }
  }, [messages]);

  useEffect(() => {
    const isMe = newMessages[newMessages.length - 1]?.user.id === user?.id;
    if (isMe || isAtBottom) {
      scrollToBottom();
    }
  }, [newMessages]);

  return (
    <div className="flex relative">
      <ChatList
        className={unselected ? "basis-full" : "hidden lg:block"}
        lastNewMessage={newMessages[newMessages.length - 1]}
      />
      <main
        className={cn("bg-gray-300 min-h-[100svh] relative grow", unselected && "flex items-center justify-center")}
      >
        {!unselected ? (
          <>
            <ChatInfo />
            <MessageList messages={messages} className="min-h-[calc(100vh-72px-56px)]" />
            <MessageList messages={newMessages} setPage={setPage} />
            <WriteMessage setNewMessages={setNewMessages} setIsAtBottom={setIsAtBottom} />
          </>
        ) : (
          <p className="bg-white hidden lg:inline-block p-2 font-bold">Выберите чат для общения</p>
        )}
      </main>
    </div>
  );
};

export default Chat;
