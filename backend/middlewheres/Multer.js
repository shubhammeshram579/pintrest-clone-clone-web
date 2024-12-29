import multer from "multer";
import path from "path"
import { fileURLToPath } from 'url';
import fs from "fs";

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create temp directory
const tempDir = path.resolve(__dirname, '/temp');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
  console.log("Directory created:", tempDir);
}




// store post img using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, tempDir)
    },
    filename: function (req, file, cb) {
      
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })

  
  
export const upload = multer({
   storage, 
})


