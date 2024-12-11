import jwt from 'jsonwebtoken';
export const adminauth=async(req,res,next)=>{
    try{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"admin not authorized"});
    }
    const token_dec=jwt.verify(token,process.env.jsonsecret);
    if(token_dec!=process.env.adminemail+process.env.adminpassword){
        return res.json({success:false,message:"admin not authized"});
    }
    next()
    }
    catch(error){
        return res.json({success:false,message:error.message});
      }
};