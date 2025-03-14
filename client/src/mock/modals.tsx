import { IModalList } from "@/types";
import { Auth, NewChat, Settings, UserInfo } from "@/components/modals";

export const modalsList: IModalList[] = [
  {
    id: 1,
    component: <Auth />,
    props: {
      name: "auth",
      closeButton: false,
    },
  },
  {
    id: 2,
    component: <NewChat />,
    props: {
      name: "newchat",
    },
  },
  {
    id: 3,
    component: <Settings />,
    props: {
      name: "settings",
    },
  },
  {
    id: 4,
    component: <UserInfo />,
    props: {
      name: "userinfo",
    },
  },
];
