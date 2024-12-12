import jwt from 'jsonwebtoken';
export const cartauth= async(req,res,next)=>{
    try{
        const token=req.headers.token;
        if(!token){
          return res.json({success:false,message:"invalid token"});
        }
        const dectoken=jwt.verify(token,process.env.jsonsecret);
        req.body.userid=dectoken.id;
        next();
    }
    catch(error){
        console.log(error);
        return res.json({success:false,message:"user not authenticated"});
    }
}