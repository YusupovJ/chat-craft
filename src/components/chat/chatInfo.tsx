import { FC } from "react";
import { Button } from "../ui/button";
import { ArrowBigLeft, Share2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { shareLink } from "@/lib/utils";
import { useChatInfo } from "@/hooks/useChat";

interface Props {
  className?: string;
}

const ChatInfo: FC<Props> = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: chat } = useChatInfo(id);

  const leave = () => {
    navigate("/chat");
  };

  return (
    <div className="sticky flex bg-primary justify-between items-center py-4 top-0 left-0 w-full px-4 shadow-md shadow-muted scroll-margin">
      <Button variant="outline" className="font-bold flex gap-2 p-2 lg:hidden" onClick={leave}>
        <ArrowBigLeft size="20" />
      </Button>
      <h2 className="font-bold text-white">{chat?.name}</h2>
      <div className="flex gap-4">
        <Button variant="outline" className="font-bold flex gap-2 p-2" onClick={shareLink}>
          <p className="hidden md:block">Пригласить</p> <Share2 size="20" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInfo;
