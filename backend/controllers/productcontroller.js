import cloudinary from 'cloudinary';
import Product from '../models/productmodel.js';
import adminmodel from '../models/adminmodel.js';
export const addproduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, size, bestseller, deltime} = req.body;
    const adminid=req.body.adminid;
    const imageUrls = [];
    if (req.files) {
      for (let key in req.files) {
        for (let file of req.files[key]) {
          if (file.path !== undefined) {
            const cloudinaryResponse = await cloudinary.v2.uploader.upload(file.path);
            imageUrls.push(cloudinaryResponse.secure_url);
          }
        }
      }
    }
    console.log(adminid);
    console.log(typeof(adminid));
    const newProduct = new Product({
      name,
      description,
      price: Number(price),
      image: imageUrls,
      category,
      subcategory,
      size: JSON.parse(size),
      date: Date.now(),
      bestseller: bestseller === "true",
      deltime,
      admin:adminid,
    });
    
    await newProduct.save();
    const admin = await adminmodel.findById(adminid);
    admin.products.push(newProduct._id); 
    await admin.save();
    return res.json({
      success: true,
      message: "Item added successfully!", 
      product: newProduct
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: 'Error adding product' });
  }
};

export const listproduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({
      message: 'Products retrieved successfully!',
      products
    });
  } catch (err) {
    console.log(err);
    res.json({ message: 'Error fetching products' });
  }
};

export const delproduct = async (req, res) => {
  try {
    const { adminid, itemId } = req.body; 
    console.log("Product ID to delete:", itemId); 

    
    const admin = await adminmodel.findById(adminid);
    if (!admin) {
      return res.json({ success: false, message: 'Admin not found' });
    }

   
    if (!admin.products.includes(itemId)) {
      return res.json({ success: false, message: 'Product does not belong to this admin' });
    }

   
    const deletedProduct = await Product.findByIdAndDelete(itemId);

    if (!deletedProduct) {
      return res.json({ success: false, message: 'Product not found' });
    }

   
    admin.products = admin.products.filter(productId => productId.toString() !== itemId);
    await admin.save();

    res.json({
      success: true,
      message: 'Product deleted successfully and removed from admin products list!',
    });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: 'Error deleting product' });
  }
};





export const productinfo = async (req, res) => {
  try {
    const { productId } = req.body; 

    if (!productId) {
      return res.status(400).json({ success: false, message: "Product ID is required." });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found." });
    }

    res.status(200).json({ success: true, product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching product info." });
  }
};
export const listproductadmin = async (req, res) => {
  try {
   
    const adminid = req.body.adminid;

  
    const products = await Product.find({ admin: adminid });

   
    return res.json({
      success:true,
      message: 'Products retrieved successfully!',
      products,
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: 'Error fetching products' });
  }
};
