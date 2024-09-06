import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { IChat } from "@/types";

export const fetchOneChat = async (id?: string) => {
  const { data } = await api.get<IChat>(urls.chat.getOne(id));
  return data;
};

export const fetchChatList = async () => {
  const { data } = await api.get<IChat[]>(urls.chat.getAll);
  return data;
};

export const fetchChatCreate = async ({ name }: { name: string }) => {
  const { data } = await api.post<IChat>(urls.chat.create, { name });
  return data;
};
