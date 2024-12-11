import {v2 as cloudinary} from 'cloudinary';
const connectcloud=async ()=>{
   await  cloudinary.config({
       cloud_name:process.env.cloudname,
       api_key:process.env.cloudapikey,
       api_secret:process.env.cloudapisecret
    })
}
export default connectcloud;