import multer from "multer";
import path from "path"
import dotenv from "dotenv"


dotenv.config();



const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempDir = process.env.NODE_ENV === 'production'
      ? '/tmp'
      : path.join(process.cwd(), 'public/temp');
    console.log('Multer destination path:', tempDir);
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

  
  
export const upload = multer({
   storage, 
})


