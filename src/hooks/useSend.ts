import { socket } from "@/lib/api";
import { multiFileUpload } from "@/services/fileService";
import { useAuthStore } from "@/store/auth";
import { TMessageType } from "@/types";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export const useSend = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  const userId = useAuthStore((state) => state.user?.id);

  const sendMessage = (content: string, type: TMessageType = "text") => {
    if (content && content.trim()) {
      socket.emit("message", {
        chatId: id,
        userId: userId,
        type,
        content,
      });

      setContent("");
      if (ref.current) ref.current.focus();
    }
  };

  const sendVoice = (audioBlob: Blob) => {
    socket.emit("voice", {
      chatId: id,
      userId: userId,
      type: "voice",
      audioBlob,
    });
  };

  const sendImage = async (files: FileList) => {
    try {
      const images = await multiFileUpload(files);
      const urls = images.map((image) => image.url);

      socket.emit("image", {
        chatId: id,
        userId: userId,
        type: "image",
        images: urls,
      });
    } catch (error) {
      toast.error("Не удалость отправить изображение");
    }
  };

  return { content, setContent, ref, sendMessage, sendVoice, sendImage };
};
