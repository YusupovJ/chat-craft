import { CHAT_KEY, CHAT_ONE_KEY } from "@/lib/constants";
import { fetchChatList, fetchOneChat } from "@/services/chatService";
import { IChat, TError } from "@/types";
import { useQuery } from "react-query";

export const useChatInfo = (id?: string) => {
  return useQuery<IChat, TError>(CHAT_ONE_KEY, async () => await fetchOneChat(id), {
    enabled: !!id,
  });
};

export const useChatList = () => {
  return useQuery<IChat[], TError>(CHAT_KEY, fetchChatList, { initialData: [] });
};
