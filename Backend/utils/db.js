import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()
const URI = process.env.MONGODB_URI

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connected to database");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDb;
