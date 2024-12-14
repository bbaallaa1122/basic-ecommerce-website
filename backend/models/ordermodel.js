import mongoose from "mongoose";
export const orderschema=new mongoose.Schema({
     userid:{type:String,required:true},
     productid:{type:String,required:true},
     size:{type:String,required:true},
     quantity:{type:Number,required:true},
     address:{type:Object,required:true},
     deldate:{type:Date,required:true},
     admin:{type:[String],required:true},
})
const ordermodel=mongoose.models.order||mongoose.model('order',orderschema);
export default ordermodel;