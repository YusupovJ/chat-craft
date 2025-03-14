import { Injectable } from "@nestjs/common";
import { envConfig } from "src/config/env.config";
import { ApiResponse } from "src/helpers/apiResponse";

@Injectable()
export class UploadService {
  async uploadFile(file: Express.Multer.File) {
    return new ApiResponse(
      {
        filename: file.filename,
        size: file.size,
        originalname: file.originalname,
        mimetype: file.mimetype,
        url: `${envConfig.apiUrl}/upload/${file.filename}`,
      },
      201,
    );
  }

  async uploadMultipleFiles(files: Express.Multer.File[]) {
    const filenames = files.map((file) => ({
      filename: file.filename,
      size: file.size,
      originalname: file.originalname,
      mimetype: file.mimetype,
      url: `${envConfig.apiUrl}/upload/${file.filename}`,
    }));

    return new ApiResponse(filenames, 201);
  }
}
