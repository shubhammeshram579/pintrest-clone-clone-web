import multer from "multer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

// Define the temporary directory for file storage
// const tempDir =
//   process.env.NODE_ENV === "production"
//     ? "/tmp" // Vercel's writable directory
//     : path.join(process.cwd(), "public/temp"); // Local directory for development

// console.log("Temporary directory for Multer:", tempDir);

// // Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     console.log("Storing file in:", tempDir);
//     cb(null, tempDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
//   },
// });

const storage = multer.memoryStorage(); 
// Export Multer Upload Middleware
export const upload = multer({ storage });
