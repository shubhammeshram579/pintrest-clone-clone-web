import mongoose from "mongoose";
import {ChatMessage} from "../models/ChatMessage.model.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsynceHendler } from "../utils/AsynceHendler.js";
import {User} from "../models/User.model.js"
import {SaveUsers} from "../models/SaveUsers.model.js"


const getUsers = AsynceHendler(async (req, res) => {
    try {

        const userId = req.user._id;

        if(!userId){
            throw new ApiError(404, "userId not found")
        };


        const saveUser = await SaveUsers.find({owner:userId}).populate("user", "fullname latestMessage");


        if(!saveUser){
            throw new ApiError(404, "saveuser not found")
        };



        return res
        .status(200)
        .json(
            new ApiResponse(200, {saveUser} ,"succes")
        )


    } catch (error) {
        throw new ApiError(500, error.message)
        
    }


});




const saveUsers = AsynceHendler(async (req, res) => {
    try {

        const {userIdToSave}  = req.body;
        const userId = req.user._id;

        if(!userId){
            throw new ApiError(404, "userId not found")
        };

        if(!userIdToSave){
            throw new ApiError(404, "userIdToSave not found")
        };


        const existingSavedUser = await SaveUsers.findOne({ owner: userId, user: userIdToSave });


        if(existingSavedUser){
            throw new ApiError(404, "User already saved")
        };



        const saveUser = new SaveUsers({
            owner: userId,
            user:userIdToSave,
        })

        await saveUser.save();


        return res
        .status(200)
        .json(
            new ApiResponse(200, {saveUser} ,"succes")
        )


    } catch (error) {
        throw new ApiError(500, error.message)
        
    }


});


const deleteSaveUsers = AsynceHendler(async (req, res) => {
    try {

        // const {_id}  = req.params;
        // const userId = req.user._id;
        const {owner, userIdToSave} = req.body;

        if(!owner){
            throw new ApiError(404, "userId not found")
        };

        if(!userIdToSave){
            throw new ApiError(404, "userId not found")
        };


        const savedUsers = await SaveUsers.findOneAndDelete({ owner: owner, user: userIdToSave });


        if(!savedUsers){
            throw new ApiError(404, "delete user")
        };


        return res
        .status(200)
        .json(
            new ApiResponse(200, {savedUsers} ,"succes")
        )


    } catch (error) {
        throw new ApiError(500, error.message)
        
    }


});




const saveUsers2 = AsynceHendler(async (req, res) => {
    try {

        const { _id, fullName, latestMessage, createdAt } = req.body;

        
            const existingUser = await SaveUsers.findById(_id);
        
            if (existingUser) {
              existingUser.latestMessage = latestMessage;
              existingUser.createdAt = createdAt;
              await existingUser.save();
            } else {
              await SaveUsers.create({
                _id,
                fullName,
                latestMessage,
                createdAt,
              });
            }


        return res
        .status(200)
        .json(
            new ApiResponse(200,"User saved/updated successfully")
        )


    } catch (error) {
        throw new ApiError(500, error.message)
        
    }


});






export {
    getUsers,
    saveUsers,
    deleteSaveUsers,
    saveUsers2
}


