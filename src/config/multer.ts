import fs from 'fs';
import { Request } from 'express';
import multer, { StorageEngine } from 'multer';

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    let folderPath: string;
    folderPath = 'uploads/';

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    cb(null, folderPath);
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    const filename = Date.now() + "-" + file.originalname;
    req.body.filename = filename;
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
});

export default upload;
