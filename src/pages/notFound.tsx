import { Headers } from "../components/headers";
import notFoundUrl from "@/assets/404-image.png";
import { ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <Headers />
      <main className="mt-24 flex items-center">
        <div className="flex container flex-col lg:flex-row items-center gap-4 justify-center">
          <img src={notFoundUrl} className="max-w-[150px]" alt="NotFound" />
          <div className="flex lg:block lg:text-left text-center flex-col items-center">
            <h2 className="text-lg sm:text-2xl lg:text-3xl font-semibold">Такой страницы не существует °⌒°</h2>
            <p className="my-3 text-sm md:text-base">Страница которую вы ищете не найдена</p>
            <Button className="flex gap-3" onClick={() => navigate(-1)}>
              <ArrowLeft /> Вернутся назад
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};
