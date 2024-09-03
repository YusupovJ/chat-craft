import { useQuery } from "react-query";
import { fetchMessages } from "@/services/messageService";
import { IMessage, TError } from "@/types";
import { MESSAGES_KEY } from "@/lib/constants";

export const useMessages = (id?: string, page: number = 1) => {
  return useQuery<IMessage[], TError>([MESSAGES_KEY, id, page], () => fetchMessages(id, page), {
    keepPreviousData: true,
  });
};
