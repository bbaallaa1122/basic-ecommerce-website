import express from 'express';
import { addcart, getcart, updatecart } from '../controllers/cartcontroller.js';
import { cartauth } from '../middlewares/cartauth.js';
const cartrouter=express.Router();
cartrouter.post('/addcart',cartauth,addcart);
cartrouter.post('/updatecart',cartauth,updatecart);
cartrouter.get('/getcart',cartauth,getcart);
export default cartrouter;