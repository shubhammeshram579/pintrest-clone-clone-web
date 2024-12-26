import mongoose from "mongoose";


const notificationSchema = new mongoose.Schema({
  recipient: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  postId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Post', 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  read: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
  
},{timestamps:true})

export const Notification = mongoose.model("Notification",notificationSchema)