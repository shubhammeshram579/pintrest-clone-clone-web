import mongoose from "mongoose";
import {ChatMessage} from "../models/ChatMessage.model.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsynceHendler } from "../utils/AsynceHendler.js";
import {User} from "../models/User.model.js"


// send message
const addChatMessage = AsynceHendler(async (req, res) => {
    
    try {
        const { from, to, message } = req.body;


        if (!from || !to || !message) {
            throw new ApiError(400, 'All fields are required');
        }

        const newMessage = new ChatMessage({ from, to, message, createdAt: new Date(), isRead:false});
        await newMessage.save();


        if(!newMessage){
            throw new ApiError(404, "something went error")
        }

        

        return res
        .status(200)
        .json(
            new ApiResponse(200, {newMessage} , "successfully add")
        )
        
    } catch (error) {
        throw new ApiError(500, error.message)
        
    }
});


// get chats
const getchat = AsynceHendler(async (req, res) => {
    try {

        const getchats = await ChatMessage.find({});
        
        if(!getchats){
            throw new ApiError(404, "chat not fund")
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200 , {getchats} , "success")
        )
        
    } catch (error) {
        throw new ApiError(500, error.message)
        
    }

});


// chats from to and to from
const fromAndTo = AsynceHendler(async (req, res) =>{
    try {
        const {from , to } = req.params;

        const chatMessages = await ChatMessage.find({
            $or:[
                {from, to},
                {from: to , to: from}
            ]
        }).sort({createdAt:1}).populate("from");

        // console.log(chatMessages)

        return res
        .status(200)
        .json(
            new ApiResponse(200, {chatMessages} , "succefully")
        )
        
    } catch (error) {
        throw new ApiError(500, error.message)
        
    }

});


// chat notification 
const chatNotification = AsynceHendler(async (req, res) => {
    try {
        // const userId = req.query.userId;
        const userId = req.user._id;

        const chatNotify = await ChatMessage.find(
            {to: userId , isRead: false}).sort({createdAt:-1}).populate("from")


        return res
        .status(200)
        .json(
            new ApiResponse(200, {chatNotify} , "succefully")
        )
    } catch (error) {
        throw new ApiError(500, error.message)
        
    }

});




// read chat
const readChat = AsynceHendler( async (req, res) =>{
    try {

        const {from , to} = req.params;

        const readchat = await ChatMessage.updateMany(
            {from, to, isRead: false},
            {$set: {isRead: true}}
        )


        return res
        .status(200)
        .json(
            new ApiResponse(200, readchat , "succefully")
        )
    } catch (error) {
        throw new ApiError(500, error.message)
        
    }

});


// / read chat
const readChat2 = AsynceHendler( async (req, res) =>{
    try {

        // const {from , to} = req.params;
        const userId = req.user._id;

        const readchat = await ChatMessage.updateMany(
            {userId, isRead: false},
            {$set: {isRead: true}}
        )


        return res
        .status(200)
        .json(
            new ApiResponse(200, {readchat} , "succefully")
        )
    } catch (error) {
        throw new ApiError(500, error.message)
        
    }

});















export {
    addChatMessage,
    getchat,
    fromAndTo,
    chatNotification,
    readChat,
    readChat2

}




