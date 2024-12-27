import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
import expressSession from "express-session"

// set up express to app
const app = express();



// configration env file path
dotenv.config()







// Basic CORS setup
app.use(cors());

// connect to frontend url
// app.use(cors({
//     origin:"-", // Replace with your frontend URL
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   }));


//   app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//     res.setHeader("Access-Control-Allow-Credentials", "true");

//     if (req.method === "OPTIONS") {
//         return res.sendStatus(200);
//     }

//     next();
// });




// app.use(cors());
// some midelware use file confifration
// app.use(express.json({limit: "16kb"}))
app.use(express.json())
app.use(express.urlencoded({extended: true, limit:"16kb"}))
app.use(express.static("public"))
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



export default app


