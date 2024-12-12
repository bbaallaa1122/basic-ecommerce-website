import mongoose from "mongoose";
export const orderschema=new mongoose.Schema({
     userid:{type:String,required:true},
     items:{type:Array,required:true},
     amount:{type:Number,required:true},
     address:{type:Object,required:true},
     status:{type:String,required:true},
     date:{type:Number,required:true},
})
const ordermodel=mongoose.models.order||mongoose.model('order',orderschema);
export default ordermodel;