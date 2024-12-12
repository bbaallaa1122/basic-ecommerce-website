import express from 'express'
import { allorders, cancelorder, updateorders } from '../controllers/ordercontroller.js';
import { savedauth } from '../middlewares/savedauth.js';
import { adminauth } from '../middlewares/adminauth.js';
const orderrouter=express.Router();
orderrouter.get('/adminorder',adminauth,allorders);
orderrouter.post('/updateorder',savedauth,updateorders);
orderrouter.post('/cancelorder',savedauth,cancelorder);
export default orderrouter