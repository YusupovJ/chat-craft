import { FC } from "react";
import { Button } from "./ui/button";
import { LogOut, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  className?: string;
}

function unsecuredCopyToClipboard(text: string) {
  const textArea = document.createElement("textarea");

  textArea.value = text;
  document.body.appendChild(textArea);

  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    toast.success("Пригласительная ссылка скопирована", {
      description: "Отправьте тому кого хотите пригласить",
    });
  } catch (err) {
    console.error(err);
    toast.error("Не удалось скопировать текст");
  }

  document.body.removeChild(textArea);
}

const ChatInfo: FC<Props> = () => {
  const navigate = useNavigate();
  const params = useParams();

  const shareLink = async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);

      toast.success("Пригласительная ссылка скопирована", {
        description: "Отправьте тому кого хотите пригласить",
      });
    } catch (error) {
      unsecuredCopyToClipboard(url);
      console.log("http copy", error);
    }
  };

  const leave = () => {
    navigate("/");
  };

  return (
    <div className="fixed flex bg-primary justify-between items-center py-4 top-0 left-0 w-full px-4 shadow-md shadow-gray-500">
      <h2 className="font-bold text-white">{params.id}</h2>
      <div className="flex gap-4">
        <Button variant="outline" className="font-bold flex gap-2 p-2" onClick={shareLink}>
          <p className="hidden md:block">Пригласить</p> <Share2 size="20" />
        </Button>
        <Button variant="outline" className="font-bold flex gap-2 p-2 left-scroll" onClick={leave}>
          <p className="hidden md:block">Выйти</p> <LogOut size="20" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInfo;
