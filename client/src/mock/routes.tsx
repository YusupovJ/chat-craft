import { Home } from "@/pages";
import Chat from "@/pages/chat";
import NotFound from "@/pages/notFound";
import { IRoutes } from "@/types";

export const routes: IRoutes[] = [
  {
    id: 1,
    path: "/",
    component: <Home />,
  },
  {
    id: 2,
    path: "*",
    component: <NotFound />,
  },
  {
    id: 3,
    path: "/chat",
    component: <Chat unselected />,
  },
  {
    id: 4,
    path: "/chat/:id",
    component: <Chat />,
  },
];
