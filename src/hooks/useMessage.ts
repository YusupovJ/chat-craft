import { MESSAGES_KEY } from "@/lib/constants";
import { fetchMessages } from "@/services/messageService";
import { IMessagePage, TError } from "@/types";
import { useInfiniteQuery } from "react-query";

export const useMessages = (id?: string) => {
  const query = useInfiniteQuery<IMessagePage, TError>([MESSAGES_KEY, id], fetchMessages, {
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined;
    },

    enabled: !!id,
  });

  const messages = query.data?.pages.reverse().flatMap((page) => page.messages) || [];

  return { ...query, messages };
};
