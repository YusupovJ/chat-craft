import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { IUploadFile } from "@/types";

export const fileUpload = async (file: FormData) => {
  const data = await api.post<any, IUploadFile>(urls.upload.add, file);
  return data;
};
