import { api } from "@/lib/api";
import { urls } from "@/lib/urls";
import { IUploadFile } from "@/types";

export const fileUpload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const data = await api.post<void, IUploadFile>(urls.upload.add, formData);
  return data;
};

export const multiFileUpload = async (files: FileList) => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }

  const data = await api.post<void, IUploadFile>(urls.upload.multi, formData);
  return data;
};
