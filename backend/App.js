import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import expressSession from "express-session"
import MongoStore from "connect-mongo"
import path from "path"
import { fileURLToPath } from "url";

import connectDB from "../backend/db/IndexDB.js"
connectDB()
// set up express to app
const app = express();



// configration env file path
dotenv.config()


// Basic CORS setup
app.use(cors());

// connect to frontend url
app.use(cors({
    origin:process.env.CORS_ORIGIN_FRONTEND_URL, // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));





// some midelware use file confifration
app.use(express.json())
app.use(express.urlencoded({extended: true, limit:"16kb"}))


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('directory-name 👉️', __dirname);
app.use(express.static(path.join(__dirname,"./public/temp")));
app.use(cookieParser())




app.use(
  expressSession({
    secret: process.env.ACCESS_TOKEN_SECRET || "yourSecretKey",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL_CLOUD || "mongodb://localhost:27017/yourDatabaseName",
      collectionName: "sessions", // Optional: Customize the collection name
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: false, // Set to true if using HTTPS
    },
  })
);




// router import
import userrouter from "./routers/User.route.js";
import userPost from "./routers/Post.route.js";
import comment from "./routers/Comment.route.js"
import notification from "./routers/Notification.route.js"
import addChatMessage from "./routers/ChatMessage.route.js"
import SaveUser from "./routers/SaveUsers.route.js"
import home from "./routers/Home.js"




// api router declaration 
app.use("/" , home)
app.use("/api" , userrouter)
app.use("/api", userPost)
app.use("/api", comment)
app.use("/api", notification)
app.use("/api", addChatMessage)
app.use("/api", SaveUser)



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app


