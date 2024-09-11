import { useNavigate, useParams } from "react-router-dom";
import ChatInfo from "../components/chat/chatInfo";
import MessageList from "../components/chat/messageList";
import WriteMessage from "../components/chat/writeMessage";
import { FC, useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { IMessage } from "@/types";
import ChatList from "../components/chat/chatList";
import { cn, scrollToBottom } from "@/lib/utils";
import { MESSAGE_LIMIT } from "@/lib/constants";
import Sidebar from "../components/sidebar/sidebar";
import { useMessages } from "@/hooks/useMessage";

interface Props {
  unselected?: boolean;
}

const Chat: FC<Props> = ({ unselected }) => {
  const [sizeSidebar, setSizeSidebar] = useState<boolean>(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  const [newMessages, setNewMessages] = useState<IMessage[]>([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [page, setPage] = useState(1);
  const { messages, fetchNextPage, hasNextPage } = useMessages(id);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  /* Подгружаем данные когда наверху страницы */

  const onScrollTop = () => {
    const handleScroll = () => {
      if (window.scrollY === 0 && hasNextPage) {
        setPage((page) => page + 1);
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  };

  useEffect(onScrollTop, [fetchNextPage, hasNextPage]);

  /* При первой загрузке отправляем вниз */

  const onFirstLoad = () => {
    if (page === 1) {
      scrollToBottom("instant");
    }
  };

  useEffect(onFirstLoad, [messages]);

  /* При подгрузке скороллим до элемента на котором остановились */

  const calcScroll = () => {
    const messages = document.querySelectorAll("[data-index]");

    if (messages.length) {
      const index = messages.length - MESSAGE_LIMIT * (page - 1) - newMessages.length;
      const top = messages[index]?.getBoundingClientRect().top;

      if (top) window.scrollTo({ top: top - 77 });
    }
  };

  useEffect(calcScroll, [page]);

  /* Отправляем пользователя вниз при отправке сообщения */

  const whenMessageSent = () => {
    const isMe = newMessages[newMessages.length - 1]?.user.id === user?.id;
    if (isMe || isAtBottom) {
      scrollToBottom();
    }
  };

  useEffect(whenMessageSent, [newMessages]);

  /*  */

  const onChatChange = () => {
    setPage(1);
  };

  useEffect(onChatChange, [id]);

  return (
    <div className="flex relative">
      <aside
        className={cn(
          `sticky transition-all top-0 left-0 max-h-screen flex`,
          unselected ? "basis-full" : "hidden lg:flex",
          sizeSidebar ? "lg:basis-[200px]" : "lg:basis-[400px]"
        )}
      >
        <Sidebar className="shrink-0 grow-0 basis-20 bg-accent" />
        <ChatList
          setSize={setSizeSidebar}
          size={sizeSidebar}
          className="grow "
          lastNewMessage={newMessages[newMessages.length - 1]}
        />
      </aside>
      <main className={cn("bg-muted min-h-[100svh] relative grow", unselected && "flex items-center justify-center")}>
        {!unselected ? (
          <>
            <ChatInfo />
            <MessageList messages={messages} className="min-h-[calc(100vh-72px-56px)]" />
            <MessageList messages={newMessages} />
            <WriteMessage setNewMessages={setNewMessages} setIsAtBottom={setIsAtBottom} />
          </>
        ) : (
          <p className="bg-background hidden lg:inline-block p-2 font-bold">Выберите чат для общения</p>
        )}
      </main>
    </div>
  );
};

export default Chat;
