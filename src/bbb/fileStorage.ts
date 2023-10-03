import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';

const DIR_NAME = 'myUploads';
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync(path.join(process.cwd(), DIR_NAME));
    } catch (e) {}

    cb(null, path.join(process.cwd(), DIR_NAME));
  },
  filename: function (rq, file, cb) {
    const uniqueSuffix =
      Date.now() +
      '-' +
      Math.round(Math.random() * 1e9) +
      '-' +
      file.originalname;
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export { storage };
