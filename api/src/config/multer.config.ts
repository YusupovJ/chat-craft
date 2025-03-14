import { diskStorage } from "multer";
import * as path from "path";

const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

export const uploadOptions = { storage: storage };
