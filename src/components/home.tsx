import Container from "./container";
import alex from "../assets/alex.png";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import bgImage from "../assets/bg-main.jpg";
import Headers from "./headers";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { GitPullRequestCreateArrow } from "lucide-react";
import { useModalStore } from "@/store/modal";

const Home = () => {
  const [chatId, setChatId] = useState("");
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { openModal } = useModalStore();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user]);

  const openForm = () => {
    openModal("auth");
  };

  return (
    <>
      <img
        src={bgImage}
        loading="lazy"
        alt="img"
        className="fixed top-0 left-0 w-full h-full z-[-1] sepia-[60%] object-cover"
      />
      <Headers />
      <Container className="justify-center content-center mt-24">
        <div className="mt-40 md:mt-0 flex-col lg:flex-row flex items-center justify-center md:justify-between gap-5">
          <div className="max-w-[550px] bg-[rgba(0,0,0,0.2)] backdrop-blur-lg p-5 rounded-lg">
            <h1 className="font-bold text-xl md:text-3xl text-gray-200">
              Добро пожаловать в craft-chat место, где встречаются люди со всего мира!
            </h1>
            <p className="my-5 text-gray-200 text-sm md:text-md">
              Здесь вы можете общаться с друзьями, заводить новые знакомства, делиться мыслями и идеями. Наш чат открыт
              для всех, независимо от возраста, интересов или местоположения. Присоединяйтесь к нам и станьте частью
              глобального сообщества, где каждый голос важен!
            </p>
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 md:space-x-5">
              <Button onClick={openForm}>
                <GitPullRequestCreateArrow />
                <p className="ml-5">Начать</p>
              </Button>
              <div className="flex space-x-1 w-full">
                <Input
                  placeholder="Поиск встречи"
                  autoComplete="false"
                  onChange={(e) => setChatId(e.target.value)}
                  value={chatId}
                  className="bg-input"
                />
                <Button onClick={() => navigate(`/chat/${chatId}`)}>Поиск</Button>
              </div>
            </div>
          </div>
          <div className="max-w-[450px] mr-10 animate-[wiggle_9s_ease-in-out_infinite] ">
            <img
              loading="lazy"
              className="animate-[zoom_1s_ease-in-out_1] origin-bottom-left"
              src={alex}
              width="100%"
              alt="alex"
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
