import express from 'express';
import {registeruser,loginuser,adminlogin} from '../controllers/usercontrollers.js';
const router=express.Router();
router.post('/register',registeruser);
router.post('/login',loginuser);
router.post('/adminlogin',adminlogin);
export default router;