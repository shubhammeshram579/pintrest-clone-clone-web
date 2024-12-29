import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {AsynceHendler} from "../utils/AsynceHendler.js"
import {Post} from "../models/Post.model.js"
import { User } from "../models/User.model.js"
import {uploadCloudinary} from "../utils/Cloudinary.js"
import {Notification} from "../models/Notification.js"
// import io from "../index.js"


// const onlineUsers = {}; 




const publishPost = AsynceHendler(async (req, res) =>{
    try {
        // get body req
        const {title,description,status} = req.body;
        const userId = req.user?._id;
        const postImageLocalpath = req.files?.postImg?.[0].path;



        // console.log(postImageLocalpath)

        if(!postImageLocalpath){
            throw new ApiError(400, "Post file requred")
        }

        const uploadPostOnCloudinary = await uploadCloudinary(postImageLocalpath)


        if(!uploadPostOnCloudinary){
            throw new ApiError(400, "upladed  PostImage error")
        }


        const PostPublish = await Post.create({
            title,
            description,
            postImg: uploadPostOnCloudinary.url,
            status,
            owner: userId,

        })

        if(!PostPublish){
            throw new ApiError(500, "somthing went wrong")
        }


        // posts creation notification page feature
        const followers = await User.find({following: PostPublish.owner});
        // console.log("followers" , followers)

        const notification = followers.map(follower => ({
            recipient: follower._id,
            sender: PostPublish.owner,
            postId: PostPublish._id,
            message: `${PostPublish.title} has created a new post.`

        }))

        await Notification.insertMany(notification);

        return res
        .status(200)
        .json(
            new ApiResponse(200, {PostPublish}, "post uploaded successfully")
        )



    } catch (error) {
        throw new ApiError(404, error.message)
        
    }


})



const getPost = AsynceHendler( async (req, res) => {
    try {

        // const userId = req.user?._id;
        const {userId} = req.params;

        if(!userId){
            throw new ApiError(404, "owner id not found")
        }

        
        const getPost = await Post.find({owner: userId})

        // console.log(getPost)
        
        if(!getPost){
            throw new ApiError(404 , "post not found")
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200 , {getPost} , "success")
        )

    } catch (error) {
        throw new ApiError(404, error.message , "post not found")
        
    }

});




const getAllPost = AsynceHendler(async (req, res) => {
    try {
        const getPosts = await Post.find()
        // console.log(getPosts)

        if(!getPosts){
            throw new ApiError(400, "post not found")
        }

        return res
        .status(200)
        .json(
            new ApiResponse(200, {getPosts} , "All get successfully")
        )
        
    } catch (error) {
        throw new ApiError(404, error.message, "post not found")
        
    }

})





const updatePost = AsynceHendler(async (req, res) => {    
        try {
            const {postId} = req.params;
            const {title, description,status} = req.body;
            const localfilpath = req.file?.path;
            // const userId = req.user._id;
        
            // console.log(localfilpath)
        
            if(!localfilpath){
                throw new ApiError(404, "localfilpath not found")
            }
        
            if(!postId){
                throw new ApiError(404, "post id not found")
            }
        
            const postToUpdate = await Post.findById(postId)

            if (!postToUpdate) {
                throw new ApiError(404, "Post not found");
            }

            const uploadcloud = await uploadCloudinary(localfilpath);
            
            if(!uploadcloud){
                    throw new ApiError(404, "filenot upladted not found")
                }
        
        
        
            const updatePost = await Post.findByIdAndUpdate(
                 postId,
                 {
                    $set: {
                        postImg: uploadcloud.url,
                        title: title,
                        description:description,
                        status:status
                }
            },
            {
                new :true}
            );
    
    
            
            if(!updatePost){
                throw new ApiError(404, "post upladted not found")
            };
    
            
    
            return res
            .status(200)
            .json(
                new ApiResponse(200,{updatePost}, "succefully updated")
            )
    
        } catch (error) {
            throw new ApiError(500, "file not updated")
            
        }
});




const deletePost = AsynceHendler( async (req, res) => {
   try {
    const {postId} = req.params;
    const userId = req.user._id;


    const postToDelete = await Post.findById(postId);

 
     if(!postToDelete){
         throw new ApiError(404, "post not founs")
     }

     if(postToDelete.owner.toString() === userId.toString()){
        await Post.findByIdAndDelete(postId)

     }else {
        const user = await User.findById(userId);
        const isSavedPost = user.savePosts.includes(postId);

        if(isSavedPost){
            user.savePosts = user.savePosts.filter(id => id.toString() !== postId);
            await user.save();

        }else{
            throw new ApiError(403, "You do not have permission to delete this post");

        }
     }

     return res
     .status(200)
     .json(
        new ApiResponse(200, null, "post deleted succesfully")
     )
   } catch (error) {
    throw new ApiError(500, error.message,"post not delted")
    
   }

});

const getPostById = AsynceHendler( async (req, res) => {
    try {
        const {postId} = req.params;
    
        const getPostbyId = await Post.findById(postId).populate("owner");
    
        if(!getPostbyId){
            throw new ApiError(404, "post not found")
        }
    
        return res
        .status(200)
        .json(
            new ApiResponse(200, {getPostbyId} ,"success" )
        )
    } catch (error) {
        throw new ApiError(404, error.message, "error not found")
        
    }
})





const searchBarByPost = AsynceHendler( async (req,res) => {
    
    try {

        const query = req.query.query;

        if(!query){
        throw new ApiError(400, "query is not working")
    }
        const getPost = await Post.find({
            $or:[
                {title: {$regex: query, $options: "i"}},
                {description: {$regex: query, $options: "i"}}
            ]
        })

        return res
        .status(200)
        .json(
            new ApiResponse(200, {getPost} , "succees")
        )

        
    } catch (error) {
        throw new ApiError(404, error.message)
        
    }

});




const savePost = AsynceHendler(async (req, res) =>{

    try {
        const {userId ,postId} = req.body;

        if(!userId || !postId){
            throw new ApiError(404, "userId and postId not found")
        }

        const user = await User.findById(userId);
        const post = await Post.findById(postId);

        // console.log(user)
        // console.log(post)

        post.isSaved = true;
        await post.save();


        if(!user || !post){
            throw new ApiError(404, "user and post not found")
        }

        if(user.savePosts.includes(postId)){
            throw new ApiError(404, "Post already saved")
        }


        user.savePosts.push(postId)
        await user.save();

        return res.
        status(200)
        .json(
            new ApiResponse(200,{message: "post successfully add"})
        )
        
    } catch (error) {
        throw new ApiError(500 ,error.message, "server error")
        
    }

})





export {
    publishPost,
    getAllPost,
    getPost,
    updatePost,
    deletePost,
    getPostById,
    searchBarByPost,
    savePost,

}

