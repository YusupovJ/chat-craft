import Container from "../components/container";
import alex from "../assets/alex.png";
import { Button } from "../components/ui/button";
import bgImage from "../assets/bg-main.jpg";
import Headers from "../components/headers";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth";
import { GitPullRequestCreateArrow } from "lucide-react";
import { useModalStore } from "@/store/modal";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { openModal } = useModalStore();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user]);

  return (
    <>
      <img
        src={bgImage}
        loading="lazy"
        alt="img"
        className="fixed top-0 left-0 w-full h-full z-[-1] sepia-[60%] object-cover"
      />
      <Headers />
      <main className="flex items-center mt-24">
        <Container className="flex-col lg:flex-row flex items-center justify-center md:justify-between gap-5">
          <div className="max-w-[550px] bg-[rgba(0,0,0,0.2)] backdrop-blur-lg p-5 rounded-lg">
            <h1 className="font-bold text-xl md:text-3xl text-gray-200">
              Добро пожаловать в место, где встречаются люди со всего мира!
            </h1>
            <p className="my-5 text-gray-200 text-sm md:text-md">
              Здесь вы можете общаться с друзьями, заводить новые знакомства, делиться мыслями и идеями. Наш чат открыт
              для всех, независимо от возраста, интересов или местоположения. Присоединяйтесь к нам и станьте частью
              глобального сообщества, где каждый голос важен!
            </p>
            <Button onClick={() => openModal("auth")} className="w-full text-lg">
              <GitPullRequestCreateArrow />
              <p className="ml-5">Начать</p>
            </Button>
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
        </Container>
      </main>
    </>
  );
};

export default Home;
