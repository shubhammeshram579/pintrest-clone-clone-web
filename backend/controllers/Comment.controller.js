import mongoose from "mongoose";
import {Comment} from "../models/Comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsynceHendler } from "../utils/AsynceHendler.js";
// import io from "../index.js";




const addComment = AsynceHendler(async (req, res)=>{
    try {
        const {content} = req.body;
        const userId = req.user._id;
        const postId = req.params;


        if(!userId){
            throw new ApiError(404, "user id not found")
        }

        // const newComment  = await Comment.create({
        //     content:content,
        //     owner:userId,
        //     post:postId,
        // });

        const newComment = new Comment({ post:postId, content:content,owner:userId });
        await newComment.save();
        

        if(!newComment){
            throw new ApiError(404, "comment not created")
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200, {newComment}, "susscefully add comment")
        )
        
    } catch (error) {
        throw new ApiError(404, error.message)
        
    }
});

const getComment = AsynceHendler(async (req,res) =>{
    try {
        const commentId = req.params;
        
        // console.log(commentId)

        if(!commentId){
            throw new ApiError(404, "commentId not found")
        }

        const getComment = await Comment.findById(commentId);

        if(!getComment){
            throw new ApiError(404, "comment not found")
        }


        return res
        .status(200)
        .json(
            new ApiResponse(200,{getComment} , "susses")
        )
        
    } catch (error) {
        throw new ApiError(404, error.message)
        
    }

})

const getCommentByOwner = AsynceHendler( async (req, res)=>{
try {
    
        // const postId = req.params;
    
        const comments = await Comment.find({post:req.params.postId}).populate("owner","email fullname").sort({createdAt:-1})
        // console.log(comments)
    
        if(!getComment.length){
            throw new ApiError(404, "post comment not found")
        }
    
        return res
        .status(200)
        .json(
            new ApiResponse(200,{comments},"success")
        )
} catch (error) {
    throw new ApiError(500, error.message)

    
}

    
})


export {
    addComment,
    getComment,
    getCommentByOwner

}