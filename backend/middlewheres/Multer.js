import multer from "multer";
import fs from "fs";



// const tempDir = "./public/temp";
// if (!fs.existsSync(tempDir)) {
//   fs.mkdirSync(tempDir, { recursive: true });
//   console.log("Directory created:", tempDir);
// }

const tempDir2 = "../public/temp";
if (!fs.existsSync(tempDir2)) {
  fs.mkdirSync(tempDir2, { recursive: true });
  console.log("Directory created:", tempDir2);
}

const tempDir3 = "..//../backend/public/temp";
if (!fs.existsSync(tempDir3)) {
  fs.mkdirSync(tempDir3, { recursive: true });
  console.log("Directory created:", tempDir3);
}



// store post img using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })

  
  
export const upload = multer({
   storage, 
})


