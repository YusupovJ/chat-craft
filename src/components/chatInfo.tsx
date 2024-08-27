import { FC, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { LogOut, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { IChat } from "@/types";
import { shareLink } from "@/lib/utils";

interface Props {
  className?: string;
}

const ChatInfo: FC<Props> = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [chat, setChat] = useState<IChat>();

  useEffect(() => {
    api.get<IChat>(urls.chat.getOne(id)).then((res) => {
      setChat(res.data);
    });
  }, [id]);

  const leave = () => {
    navigate("/chat");
  };

  return (
    <div className="sticky flex bg-primary justify-between items-center py-4 top-0 left-0 w-full px-4 shadow-md shadow-muted scroll-margin">
      <h2 className="font-bold text-white">{chat?.name}</h2>
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
