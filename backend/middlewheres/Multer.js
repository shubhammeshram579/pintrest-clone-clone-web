import multer from "multer";
import path from "path"
import dotenv from "dotenv"


dotenv.config();


console.log('Current working directory:', process.cwd());


// const tempDir = process.env.NODE_ENV === 'production'
//   ? '/tmp' // Vercel's writable directory
//   : path.join(process.cwd(), 'public/temp'); // Local directory

// console.log('Using temporary directory:', tempDir);





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


