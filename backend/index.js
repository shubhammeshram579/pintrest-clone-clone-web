const onlineUsers = {};
import dotenv from "dotenv"
import {app} from "./App.js"
import {ChatMessage} from "./models/ChatMessage.model.js"
import { User } from "./models/User.model.js"
import connectDB from "../backend/db/IndexDB.js"




// this are server set for same time get chats from other user using this libriey
import http from "http"
import { Server } from 'socket.io';


dotenv.config()




// // set up of funcanality
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin:"https://pintrest-clone-frontend.vercel.app", // Replace with your frontend URL
      methods: ["GET", "POST","PUT"],
    },
  });

  // console.log(process.env.CORS_ORIGIN_FRONTEND_URL)








io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', async (data) => {
      const { from, to, message} = data;
      
      try {
          // Fetch the 'from' user details
          const fromUser = await User.findById(from).select('-password'); // Exclude password field

          if (!fromUser) {
              console.error('User not found');
              return;
          }

          

          // Emit the message with populated 'from' details
          io.emit('receiveMessage', { 
              from: fromUser, 
              to, 
              message, 
              createdAt: new Date(), 
              isRead: false
          });



      } catch (error) {
          console.log('Error fetching user details:', error);
      }
  });

  socket.on('disconnect', () => {
      console.log('Client disconnected');
  });
});



// Socket.IO connection handling
io.on("connection", (socket) => {
    console.log("New client connected");

    // Join room based on postId
    socket.on("sendComment", async (data) => {
        const {content ,owner} = data;
        try {

            const user = await User.findById(owner);
            console.log("sockedi",user)
            if(!user){
                console.error('User not found');
              return;
            }


            io.emit('recivedComment', {  
                content:content, 
                owner:user,
                createdAt: new Date(), 
            });

            
        } catch (error) {
            console.log(error.message)
            
        }
    });

    socket.on("disconnect", () => {
        console.log('Client disconnected');
    });
});








io.on('connection', (socket) => {
    console.log('a user connected');
  
    socket.on('deleteNotification', async (notificationId) => {
      try {
        // Perform your delete logic here, e.g., removing from a database
        // Assuming deleteNotificationById is a function that deletes the notification
        await deleteNotificationById(notificationId);
        
        // Notify all clients to update their notification list
        io.emit('notificationDeleted', notificationId);
      } catch (error) {
        console.error('Error deleting notification:', error);
      }
    });
  
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });


// const PORT = process.env.PORT || 8000;


// mongodb databases connection
connectDB()


const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default io





