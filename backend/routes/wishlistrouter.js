import express from 'express';
import { savedauth } from '../middlewares/savedauth.js';
import { additem, getitem, removeitem } from '../controllers/wishlistcontroller.js';
const wishlistrouter=express.Router();
wishlistrouter.post('/additem',savedauth,additem);
wishlistrouter.post('/removeitem',savedauth,removeitem);
wishlistrouter.get('/getitem',savedauth,getitem);
export default wishlistrouter;