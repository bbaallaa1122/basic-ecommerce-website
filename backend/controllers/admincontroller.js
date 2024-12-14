import adminmodel from '../models/adminmodel.js';
import validator from 'validator';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
const createtoken=(id)=>{
  return jwt.sign({id},process.env.jsonsecret);
}
export const registeradmin= async(req,res)=>{
    try{
     const {name,email,password}=req.body;
     const adminexist= await adminmodel.findOne({email});
     if(adminexist){
      return res.json({success:false,message:"the admin already exists"});
     }
     if(!validator.isEmail(email)){
       return res.json({success:false,message:"enter a valid mail id"});
     }
     if(password.length<8){
      return res.json({success:false,message:"enter a strong password"})
     }
     const s=await bcrypt.genSalt(10);
     const hashedpass=await bcrypt.hash(password,s);
      const newadmin= new adminmodel({
        name,email,password:hashedpass
      })
      const admin=await newadmin.save();
      const token=createtoken(admin._id);
     return  res.json({success:true,token})}
     catch(error){
      return res.json({success:false,message:error.message});
     }
  }
  export const adminlogin= async(req,res)=>{
    try{const {email,password}=req.body;
    const admin= await adminmodel.findOne({email});
    if(!admin){
      return res.json({success:false,message:"the user doesnt exist"});
    }
    const crctpass= await bcrypt.compare(password,admin.password);
    if(!crctpass){
      return res.json({success:false,message:"enter valid credentials"});
    }
      const token=createtoken(admin._id);
      return res.json({success:true,token})
    }
    catch(error){
      return res.json({success:false,message:error.message});
    }
  }