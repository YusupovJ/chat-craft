import { cn } from "@/lib/utils";
import { stiker } from "@/mock/stiker";
import { useThemeStore } from "@/store/theme";
import { IMessage } from "@/types";
import { FC } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

interface Props {
  message: IMessage;
}

export const Message: FC<Props> = ({ message }) => {
  const { theme } = useThemeStore();

  if (message.type === "sticker") {
    const stickerUrl = stiker[+message.content.slice(1, 3)].url;
    return <img src={stickerUrl} className="block m-auto w-96 h-96" alt="stiker" />;
  }
  if (message.type === "voice") {
    return (
      <AudioPlayer
        className={cn(
          theme === "dark" ? "bg-[rgb(26,26,26)]" : "bg-white",
          "audio-player border-none w-[250px] sm:w-[400px]"
        )}
        src={`${message.content}`}
      />
    );
  }
  return (
    <p className="gap-2 flex flex-wrap">
      {message.content.split(" ").map((word, index) => {
        const isUrl = word.startsWith("https://") || word.startsWith("http://");
        if (isUrl) {
          return (
            <a href={word} key={index} target="_blank" className="text-blue-500 underline break-all">
              {word}
            </a>
          );
        }

        return (
          <span key={index} className="break-all">
            {word}
          </span>
        );
      })}
    </p>
  );
};
