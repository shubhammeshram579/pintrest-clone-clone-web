import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {AsynceHendler} from "../utils/AsynceHendler.js"
import {Notification} from "../models/Notification.js"
import { User } from "../models/User.model.js"
import {Post} from "../models/Post.model.js"



// new post upload notification
const notification  = AsynceHendler(async (req, res) =>{
    try {

        // const {userId} = req.params;
        const userId = req.user._id

        const notification = await Notification.find({recipient:userId}).populate("sender postId");
        // console.log("notification",notification)

        if(!notification){
            throw new ApiError(404, "notication not get")
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200, {notification}, "success")
        )
        
    } catch (error) {
        throw new ApiError(500, error.message)
        
    }

});


const deleteNotification  = AsynceHendler(async (req,res) =>{
    try {
        const {notificationId} = req.params;

        const deleteNOt = await Notification.findByIdAndDelete(notificationId);

        if(!deleteNOt){
            throw new ApiError(404, "notification not deleted")
        }


        // // Emit an event to all connected clients
        // io.emit('deleteNotification', id);

        return res
        .status(200)
        .json(
            new ApiResponse(200, {deleteNOt}, "success")
        )
    } catch (error) {
        throw new ApiError(500, error)
        
    }

})

export {
    notification,
    deleteNotification
}