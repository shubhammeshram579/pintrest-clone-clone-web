import mongoose from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// const savePostsSchema =  mongoose.Schema({
//     postId : {type: mongoose.Schema.Types.ObjectId, ref:"Post"},
//     title: {type: String},
//     description: {type: String},
//     postImg: {type:String}
// })

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        username:{
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            trim:true,
            index:true
        },
        
        email:{
            type:String,
            required: true,
            unique: true,
            lowercase: true,
            trim:true,

        },
        savePosts: [
            {type: mongoose.Schema.Types.ObjectId,
             ref:"Post"}],
        followers:[
            {type: mongoose.Schema.Types.ObjectId, ref:"User" }
        ],
        following:[
            {type: mongoose.Schema.Types.ObjectId, ref:"User" }
        ],
        password:{
            type: String,
            required:[true, "password is required"]
        },
        refreshToken:{
            type: String,
        },
       
        

    },{timestamps:true}
)

// middlewere for save password 
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// bcrypt verify password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// methods generateAccessToken for seation
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )

}

// generateRefreshToken for cookieys
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
    
}


export const User = mongoose.model("User", userSchema)