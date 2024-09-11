import { MESSAGES_KEY } from "@/lib/constants";
import { fetchMessages } from "@/services/messageService";
import { IMessage, TError } from "@/types";
import { useState } from "react";
import { useQuery } from "react-query";

export const useMessages = (page: number, id?: string) => {
  const [totalPages, setTotalPages] = useState(1);

  const query = useQuery<IMessage[], TError>(
    [MESSAGES_KEY, page, id],
    async () => {
      const { data, pagination } = await fetchMessages(page, id);
      setTotalPages(pagination?.totalPages || 1);
      return data;
    },
    { enabled: page <= totalPages }
  );

  return query;
};
