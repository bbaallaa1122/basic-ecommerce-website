import jwt from 'jsonwebtoken';
export const adminauth=async(req,res,next)=>{
    try{
    const {token}=req.headers;
    if(!token){
        return res.json({success:false,message:"admin not authorized"});
    }
    const dectoken=jwt.verify(token,process.env.jsonsecret);
    req.body.adminid=dectoken.id;
    next();
    }
    catch(error){
        return res.json({success:false,message:error.message});
      }
};