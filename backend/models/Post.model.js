import mongoose from "mongoose";
import mongooseAgregatePaginate from "mongoose-aggregate-paginate-v2"


const postSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required: true,
        },
        description:{
            type:String,
            required: true
        },
        postImg:{
            type:String,
            required: true
        },
        status:{
            type:String
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        isSaved: {
            type: Boolean,
            default: false, // Default value is false
        },
    

},{timestamps:true})

postSchema.plugin(mongooseAgregatePaginate)


export const Post = mongoose.model("Post", postSchema)