import express from 'express';
import {addproduct,listproduct,delproduct,productinfo} from '../controllers/productcontroller.js';
import upload from '../middlewares/multer.js';
import  {adminauth}  from '../middlewares/adminauth.js';
const productrouter=express.Router();
productrouter.post('/addproduct',adminauth,upload.fields([
    { name: 'image1', maxCount: 1 },  
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 }]),addproduct);
productrouter.post('/delproduct',adminauth,delproduct);
productrouter.post('/productinfo',productinfo);
productrouter.get('/listproduct',listproduct);
export default productrouter;
