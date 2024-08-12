import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { Request } from 'express';

export const multerConfig = {
  storage: diskStorage({
    destination: './uploads',
    filename: (req: Request, file, callback) => {
      const title = req.body.title;
      const date = new Date().toISOString().replace(/:/g, '-');
      const fileExtension = extname(file.originalname);

      const filename = `${title}-${date}${fileExtension}`;
      
      // Generate the full URL
      const fullUrl = `${process.env.BASE_URL}/uploads/${filename}`;
      
      req.body.imageUrl = fullUrl; // Store the full URL in the request body for later use

      callback(null, filename);
    },
  }),
  fileFilter: (req, file, callback) => {
    if (!file.mimetype.match(/\/(jpeg)$/)) {
      return callback(null, false);  // Reject the file but do not throw an error
    }
    callback(null, true);
  },
};
