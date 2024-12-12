import express from 'express';
import { addcart, getcart, updatecart } from '../controllers/cartcontroller.js';
import { savedauth } from '../middlewares/savedauth.js';
const cartrouter=express.Router();
cartrouter.post('/addcart',savedauth,addcart);
cartrouter.post('/updatecart',savedauth,updatecart);
cartrouter.get('/getcart',savedauth,getcart);
export default cartrouter;