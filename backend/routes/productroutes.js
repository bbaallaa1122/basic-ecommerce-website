import express from 'express';
import { addproduct, listproduct, delproduct, productinfo, listproductadmin } from '../controllers/productcontroller.js';
import upload from '../middlewares/multer.js';
import { adminauth } from '../middlewares/adminauth.js';

const productrouter = express.Router();

productrouter.post('/addproduct', adminauth, (req, res, next) => {
  // Store adminid in req object before multer processes the files
  const adminid = req.body.adminid;

  // Proceed with multer file upload
  upload.fields([
    { name: 'image1', maxCount: 1 },
    { name: 'image2', maxCount: 1 },
    { name: 'image3', maxCount: 1 },
    { name: 'image4', maxCount: 1 },
  ])(req, res, (err) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error uploading files' });
    }

    // Restore adminid after multer processes the files
    req.body.adminid = adminid;

    // Proceed to the addproduct controller
    next();
  });
}, addproduct);

productrouter.post('/delproduct', adminauth, delproduct);
productrouter.get('/listproductadmin',adminauth,listproductadmin);
productrouter.post('/productinfo', productinfo);
productrouter.get('/listproduct', listproduct);

export default productrouter;
