import mongoose from "mongoose";
const userschema=new mongoose.Schema({
    name:{type:String ,required:true},
    email:{type:String ,required:true,unique:true},
    password:{type:String,required:true},
    cart:{type:Object,default:{}},
    wishlist:{type:Object,default:{}},
},{minimize:false})
const usermodel= mongoose.model.user || mongoose.model('user',userschema);
export default usermodel;