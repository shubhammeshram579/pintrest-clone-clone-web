import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";



// configration env file path
dotenv.config()


// set up express to app
const app = express();




// Basic CORS setup
app.use(cors());

// connect to frontend url
app.use(cors({
    origin:"https://pintrest-clone-frontend.vercel.app", // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));



// app.use(cors());
// some midelware use file confifration
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())



// router import
import userrouter from "./routers/User.route.js";
import userPost from "./routers/Post.route.js";
import comment from "./routers/Comment.route.js"
import notification from "./routers/Notification.route.js"
import addChatMessage from "./routers/ChatMessage.route.js"
import SaveUser from "./routers/SaveUsers.route.js"
import home from "./routers/Home.js"


// import { access } from "fs";



// api router declaration 
app.use("/" , home)
app.use("/api" , userrouter)
app.use("/api", userPost)
app.use("/api", comment)
app.use("/api", notification)
app.use("/api", addChatMessage)
app.use("/api", SaveUser)




export  {app}


