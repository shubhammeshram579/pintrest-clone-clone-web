import multer from "multer";
import fs from "fs";
import path from "path"


// Create temp directory
const tempDir = path.resolve(__dirname, '../backend/public/temp');
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


