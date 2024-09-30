import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { IUploadFile } from "@/types";

export const fileUpload = async (file: FormData) => {
  const data = await api.post<void, IUploadFile>(urls.upload.add, file);
  return data;
};
