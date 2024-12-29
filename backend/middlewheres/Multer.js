import multer from "multer";
import fs from "fs";



const tempDir = "./backend/public/temp";
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
  console.log("Directory created:", tempDir);
}


// store post img using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./backend/public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })

  
  
export const upload = multer({
   storage, 
})


