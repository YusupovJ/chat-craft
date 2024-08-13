import { GitPullRequestCreateArrow } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";

const NewChat = () => {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const isAuth = useAuthStore((state) => state.accessToken);
  const [open, setOpen] = useState(false);

  const createChat = async () => {
    if (name) {
      try {
        const res = await api.post<any, IApiReponse<IChat>>(urls.chat.create, { name });
        navigate(`/chat/${res.data.id}`);
      } catch (error) {
        console.log(error);
        toast.error("Что то пошло не так");
      }

      return;
    }

    toast.error("Введите имя для группы");
  };

  const checkAuth = () => {
    if (!isAuth) {
      setOpen(false);
      toast.error("Пройдите регистрацию");
    }
  };

  return (
    <Dialog open={Boolean(open && isAuth)} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={checkAuth}>
          <GitPullRequestCreateArrow />
          <p className="ml-5">Cоздать</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-6">
        <DialogHeader>
          <DialogTitle>Создать группу</DialogTitle>
          <DialogDescription className="hidden"></DialogDescription>
        </DialogHeader>
        <Input placeholder="Имя группы" onChange={(e) => setName(e.target.value)} value={name} />
        <Button onClick={createChat}>Создать</Button>
      </DialogContent>
    </Dialog>
  );
};

export default NewChat;
