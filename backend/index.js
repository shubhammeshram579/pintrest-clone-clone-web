import dotenv from "dotenv"
import cors from "cors"
import app from "./App.js"
import {ChatMessage} from "./models/ChatMessage.model.js"
import { User } from "./models/User.model.js"


// // this are server set for same time get chats from other user using this libriey
import http from "http"
import { Server } from 'socket.io';


// app.use(cors());
dotenv.config()
const onlineUsers = {};






// // // set up of funcanality
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
      origin:process.env.CORS_ORIGIN_FRONTEND_URL, // Replace with your frontend URL
      methods: ["GET", "POST","PUT"],
    },
});






io.on('connection', (socket) => {
  console.log('New client connected');

  onlineUsers[socket.id] = true; // Add user to online list

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
      delete onlineUsers[socket.id]
  });
});



// Socket.IO connection handling
io.on("connection", (socket) => {
    console.log("New client connected");
    onlineUsers[socket.id] = true; // Add user to online list

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
        delete onlineUsers[socket.id]
    });
});








io.on('connection', (socket) => {
    console.log('a user connected');

    onlineUsers[socket.id] = true; // Add user to online list
  
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
      delete onlineUsers[socket.id]
    });
  });




// if (httpServer instanceof http.Server) {
//     console.log('Server is properly initialized.');
// } else {
//     console.error('Server initialization failed. Check your setup.');
// }

// const PORT = process.env.IOPORT || 5000;
// httpServer.listen(PORT, () => console.log(`Server socked io running on port 3000`));



export default io





