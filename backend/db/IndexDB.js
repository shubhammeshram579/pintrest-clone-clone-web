import mongoose from "mongoose";
import dotenv from "dotenv"


// configration env file path
dotenv.config()

// dotenv.config();


// connect mongodb database connection
const connectDB = async () => {
    try {
           await mongoose.connect(process.env.MONGODB_URL_CLOUD)

           console.log("✅ MongoDB Connected Successfully!");
    } catch (error) {
        console.log("MONGODB connectin Failed", error);
        process.exit(1)
        
    }
}

export default connectDB