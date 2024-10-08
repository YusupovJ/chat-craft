import { Paperclip, Send } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChangeEvent, Dispatch, FC, SetStateAction, useEffect } from "react";
import { useAuthStore } from "@/store/auth";
import { IMessage } from "@/types";
import { StickerEmojiMenu } from "../emoji";
import { Recorder } from "./recorder";
import { socket } from "@/lib/api";
import { useSend } from "@/hooks/useSend";
import { useParams } from "react-router-dom";

interface IProps {
  setNewMessages: Dispatch<SetStateAction<IMessage[]>>;
}

export const WriteMessage: FC<IProps> = ({ setNewMessages }) => {
  const { id } = useParams();
  const userId = useAuthStore((state) => state.user?.id);
  const { content, ref, sendMessage, setContent, sendImage } = useSend();

  useEffect(() => {
    socket.emit("joinRoom", { chatId: id, userId });

    socket.on("reply", (msg) => {
      setNewMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off("reply");
      socket.emit("leaveRoom", { chatId: id });
    };
  }, [socket, id, userId]);

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const images = e.target.files!;
    sendImage(images);
  };

  return (
    <div className="sticky flex bg-background py-2 bottom-0 left-0 w-full px-2 space-x-2">
      <Recorder />
      <Input
        placeholder="Сообщение"
        ref={ref}
        type="search"
        id="input-message"
        autoComplete="off"
        className="rounded-none border-2"
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            sendMessage(content);
          }
        }}
        value={content}
      />
      <StickerEmojiMenu setContent={setContent} />
      <Button variant="outline" className="p-0 border-2">
        <label htmlFor="select-files" className="p-1">
          <Paperclip />
        </label>
      </Button>
      <input
        id="select-files"
        type="file"
        accept="image/*"
        onChange={onFileSelect}
        multiple
        className="fixed top-0 left-0 invisible w-0 h-0 opacity-0"
      />
      <Button
        className="rounded-none flex gap-2 items-center"
        onClick={() => sendMessage(content)}
        aria-label="Отправить сообщение"
      >
        <p className="hidden md:block">Отправить сообщение</p> <Send />
      </Button>
    </div>
  );
};
