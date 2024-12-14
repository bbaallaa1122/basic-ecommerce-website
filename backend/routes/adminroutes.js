import express from 'express';
import { adminlogin, registeradmin } from '../controllers/admincontroller.js';
const adminrouter=express.Router();
adminrouter.post('/registeradmin',registeradmin);
adminrouter.post('/loginadmin',adminlogin);
export default adminrouter;