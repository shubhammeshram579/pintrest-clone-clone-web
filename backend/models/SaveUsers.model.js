import mongoose from "mongoose";


const saveuserSchema = new mongoose.Schema({

  _id: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true 
  },
  fullName: { 
    type: String, 
    required: true 
},
latestMessage: { 
  type: String,
  required: true 
},
createdAt: { 
  type: Date, 
  default: Date.now 

},

})


export const SaveUsers = mongoose.model("SaveUsers" ,saveuserSchema)