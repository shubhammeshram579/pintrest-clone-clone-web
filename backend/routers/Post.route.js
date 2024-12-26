import {Router} from "express"
// import cors from "cors"
import express from "express"

import { publishPost, getAllPost, getPost, updatePost, deletePost ,getPostById,searchBarByPost,savePost} from "../controllers/Post.controller.js"

import {verifyJWT} from "../middlewheres/Auth.middlewere.js"
import {upload} from "../middlewheres/Multer.js"




const router = Router();
// midelwere user login check
router.use(verifyJWT);


// post crete router
router.route("/posts/addpost").post(
    upload.fields([
        {
            name: "postImg",
            maxCount: 1,
        }
    ]), publishPost

);

// get all posts router
router.route("/posts/getAllpost").get(getAllPost)
// get post by userId
router.route("/posts/getPost/:userId").get(getPost)
// save post router
router.route("/posts/savePost").post(savePost)
// search post and filter post router
router.route("/posts/getAllpost/search").get(searchBarByPost)
// get post by postId
router.route("/posts/getPostByID/:postId").get(getPostById)
// updated post 
router.route("/posts/EditPost/:postId").patch(upload.single("postImg"),updatePost)
// delete post
router.route("/posts/deletePost/:postId").delete(deletePost)



export default router