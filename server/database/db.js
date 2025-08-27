import mongoose from "mongoose";

const ConnectDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected")
    } catch (error) {
        console.log("db connect error :", error)
    }
}

export default ConnectDb;