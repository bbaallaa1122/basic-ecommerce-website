import usermodel from '../models/usermodel.js'
import validator from 'validator';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';

const createtoken=(id)=>{
  return jwt.sign({id},process.env.jsonsecret);
}
const registeruser= async(req,res)=>{
  try{
   const {name,email,password}=req.body;
   const userexist= await usermodel.findOne({email});
   if(userexist){
    return res.json({success:false,message:"the user already exists"});
   }
   if(!validator.isEmail(email)){
     return res.json({success:false,message:"enter a valid mail id"});
   }
   if(password.length<8){
    return res.json({success:false,message:"enter a strong password"})
   }
   const s=await bcrypt.genSalt(10);
   const hashedpass=await bcrypt.hash(password,s);
    const newuser= new usermodel({
      name,email,password:hashedpass
    })
    const user=await newuser.save();
    const token=createtoken(user._id);
   return  res.json({success:true,token})}
   catch(error){
    return res.json({success:false,message:error.message});
   }
}
const loginuser= async(req,res)=>{
  try{const {email,password}=req.body;
  const user= await usermodel.findOne({email});
  if(!user){
    return res.json({success:false,message:"the user doesnt exist"});
  }
  const crctpass= await bcrypt.compare(password,user.password);
  if(!crctpass){
    return res.json({success:false,message:"enter valid credentials"});
  }
    const token=createtoken(user._id);
    return res.json({success:true,token})
  }
  catch(error){
    return res.json({success:false,message:error.message});
  }
}


export {registeruser,loginuser};