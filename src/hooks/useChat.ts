import { CHAT_CREATE_KEY, CHAT_KEY, CHAT_ONE_KEY } from "@/lib/constants";
import { fetchChatCreate, fetchChatList, fetchOneChat } from "@/services/chatService";
import { IChat, ICreateChat, TError } from "@/types";
import { useMutation, useQuery } from "react-query";

export const useChatInfo = (id?: string) => {
  return useQuery<IChat, TError>(CHAT_ONE_KEY, async () => await fetchOneChat(id), {
    enabled: !!id,
  });
};

export const useChatList = () => {
  return useQuery<IChat[], TError>(CHAT_KEY, fetchChatList, { initialData: [] });
};

export const useChatCreate = () => {
  return useMutation<IChat, TError, ICreateChat>(CHAT_CREATE_KEY, fetchChatCreate);
};
