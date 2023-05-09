import multer, { Multer, StorageEngine } from "multer";
import path from "path";

const diskStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(process.cwd(), "src", "uploades"));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: diskStorage });

export default upload;
