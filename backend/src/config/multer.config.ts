import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads', // Save files to the uploads directory
    filename: (req: Request, file, callback) => {
      const title = req.body.title;
      const date = new Date().toISOString().replace(/:/g, '-');
      const fileExtension = extname(file.originalname);

      // Generate a clean filename without special characters
      const filename = `${title}-${date}${fileExtension}`;

      callback(null, filename); // Store the clean filename
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpeg|jpg)$/)) {  // Accept both jpeg and jpg
      return callback(null, false);  // Reject the file if it's not JPEG
    }
    callback(null, true);
  },
};
