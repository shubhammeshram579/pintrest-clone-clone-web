import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"


const commentSchema = new Schema(
    {
        content:{
            type:String,
            required:true
        },
        owner:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        post:{
                type: mongoose.Types.ObjectId,
                ref:"Post",
                required:true
        },
        createdAt: {
                type: Date,
                default: Date.now
            }
        
    },
    {
        timestamps:true
    }
)

commentSchema.plugin(mongooseAggregatePaginate)

export const Comment = mongoose.model("Comment",commentSchema)