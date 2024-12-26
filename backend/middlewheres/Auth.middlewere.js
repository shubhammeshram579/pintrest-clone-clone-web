import {ApiError} from "../utils/ApiError.js"
import {AsynceHendler} from "../utils/AsynceHendler.js"
import jwt from "jsonwebtoken"
import {User} from "../models/User.model.js"
import dotenv from "dotenv";


// configration env file path
dotenv.config();

// dotenv.config();

// user is login or not jwt set decodedToken
export const verifyJWT = AsynceHendler( async (req, res, next) =>{
try {
    const token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");
    console.log("Token:", token);

    if(!token){
        throw new ApiError(401, "Unauthorized requrest")
    }

    const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    console.log("Decoded Token:", decodedToken);

    const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
    )

    console.log("User:", user);

    if(!user){
        throw new ApiError(401 , "invalid access token")
    }


    req.user = user;
    next()
    
} catch (error) {
    throw new ApiError(401, error?.message || "invalid acces token")

    
}
})