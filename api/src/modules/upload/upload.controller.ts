import { Controller, Get, Param, Post, Res, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { uploadOptions } from "src/config/multer.config";
import { resolve } from "path";
import { Response } from "express";
import { ApiTags } from "@nestjs/swagger";

@Controller("upload")
@ApiTags("upload")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file", uploadOptions))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.uploadService.uploadFile(file);
  }

  @Post("/multiple")
  @UseInterceptors(FilesInterceptor("files", 10, uploadOptions))
  async uploadMultipleFiles(@UploadedFiles() files: Express.Multer.File[]) {
    return await this.uploadService.uploadMultipleFiles(files);
  }

  @Get("/:name")
  async getFile(@Res() res: Response, @Param("name") name: string) {
    const filePath = resolve("uploads", name);
    return res.sendFile(filePath);
  }
}
