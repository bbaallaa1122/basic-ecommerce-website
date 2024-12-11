import mongoose from "mongoose";

const connectdb=async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("db connected");
    })
    await mongoose.connect(`${process.env.mongodb}/basic-clothing`)
}
export default connectdb