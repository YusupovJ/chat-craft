import { Button } from "@/components/ui/button";
import { fileUpload } from "@/services/fileService";
import { Trash } from "lucide-react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

interface PropsFile {
  uploadedFile: Dispatch<SetStateAction<string>>;
}

export const FileUpload = ({ uploadedFile }: PropsFile) => {
  const [uploadFile, setUploadFile] = useState<string | null>(null);
  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const data = await fileUpload(formData);
        setUploadFile(data.url);
        uploadedFile(data.url);
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (uploadFile) {
    return (
      <div className="relative">
        <Button variant="outline" onClick={() => setUploadFile(null)} className="absolute top-0 right-0">
          <Trash size={20} />
        </Button>
        <img src={uploadFile} alt="upload img" />
      </div>
    );
  }

  return (
    <>
      <Button className="p-10 relative border border-dashed" variant="outline">
        <input
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          onChange={(e) => handleFile(e)}
          type="file"
        />
        <div className="absolute left-0 text-center right-0 z-0">
          <p>Загрузить файл</p>
          <p className="text-[10px] opacity-65 font-[100]">Переместите файл сюда</p>
        </div>
      </Button>
    </>
  );
};
