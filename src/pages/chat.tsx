import { useParams } from "react-router-dom";
import { ChatInfo } from "../components/chat/chatInfo";
import { MessageList } from "../components/chat/messageList";
import { WriteMessage } from "../components/chat/writeMessage";
import { Sidebar } from "../components/sidebar/sidebar";
import { FC, useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth";
import { IMessage } from "@/types";
import { ChatList } from "../components/chat/chatList";
import { cn, isAtBottom, scrollToBottom } from "@/lib/utils";
import { useMessages } from "@/hooks/useMessage";
import { useModalStore } from "@/store/modal";
import { Button } from "@/components/ui/button";
import { icons } from "lucide-react";

interface Props {
  unselected?: boolean;
}

export const Chat: FC<Props> = ({ unselected }) => {
  const [sizeSidebar, setSizeSidebar] = useState<boolean>(false);
  const { id } = useParams();
  const { openModal, openModals } = useModalStore();
  const { isAuthenticated, user } = useAuthStore();
  const [newMessages, setNewMessages] = useState<IMessage[]>([]);
  const [page, setPage] = useState(1);
  const { data: messages } = useMessages(page, id);

  useEffect(() => {
    if (!isAuthenticated && !openModals.auth) {
      openModal("auth");
    }
  }, [isAuthenticated, openModals]);

  useEffect(() => {
    scrollToBottom("instant");
  }, [messages]);

  useEffect(() => {
    const isMe = newMessages[newMessages.length - 1]?.user?.id === user?.id;
    if (isMe || isAtBottom()) scrollToBottom();
  }, [newMessages]);

  const onChatChange = () => {
    setPage(1);
    setNewMessages([]);
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
        <div className="flex flex-col w-full">
          <Button
            variant="ghost"
            className="w-20 ml-auto hidden lg:flex"
            onClick={() => setSizeSidebar?.(sizeSidebar ? false : true)}
          >
            <icons.ArrowBigLeft className={cn(sizeSidebar ? "rotate-180" : "rotate-0", "transition-all")} />
          </Button>
          <ChatList size={sizeSidebar} className="grow" lastNewMessage={newMessages[newMessages.length - 1]} />
        </div>
      </aside>
      <main className={cn("bg-muted relative grow", unselected && "flex items-center justify-center min-h-[100dvh]")}>
        {!unselected ? (
          <>
            <ChatInfo />
            <div className="min-h-[calc(100dvh-72px-56px)]">
              <MessageList messages={messages} />
              <MessageList messages={newMessages} />
            </div>
            <WriteMessage setNewMessages={setNewMessages} />
          </>
        ) : (
          <p className="bg-background hidden lg:inline-block p-2 font-bold">Выберите чат для общения</p>
        )}
      </main>
    </div>
  );
};
