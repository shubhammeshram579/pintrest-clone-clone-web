import mongoose from "mongoose"

const chatMessageSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
      isRead: { 
        type: Boolean,
        default: false 
      },
      

})


export const ChatMessage = mongoose.model("ChatMessage" ,chatMessageSchema)