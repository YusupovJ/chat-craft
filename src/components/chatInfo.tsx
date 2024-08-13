import { FC } from "react";
import { Button } from "./ui/button";
import { LogOut, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  className?: string;
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
      toast.error("Не удалось скопировать текст");
      console.log(error);
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
        <Button variant="outline" className="font-bold flex gap-2 p-2" onClick={leave}>
          <p className="hidden md:block">Выйти</p> <LogOut size="20" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInfo;
