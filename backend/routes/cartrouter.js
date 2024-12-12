import express from 'express';
import { addcart, cancelorder, getcart, getorders, placeorder, updatecart } from '../controllers/cartcontroller.js';
import { savedauth } from '../middlewares/savedauth.js';
const cartrouter=express.Router();
cartrouter.post('/addcart',savedauth,addcart);
cartrouter.post('/updatecart',savedauth,updatecart);
cartrouter.get('/getcart',savedauth,getcart);
cartrouter.get('/placeorder',savedauth,placeorder);
cartrouter.post('/cancelorder',savedauth,cancelorder);
cartrouter.get('/getorders',savedauth,getorders);
export default cartrouter;