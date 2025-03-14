import { lazy } from "react";

export const Auth = lazy(() => import("./auth"));
export const NewChat = lazy(() => import("./newChat"));
export const UserInfo = lazy(() => import("./userInfo"));
export const Settings = lazy(() => import("./settings"));
